import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Barrio } from 'src/app/interfaces/barrio';
import { ResumeDireccion } from 'src/app/interfaces/direccion';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { ResumeUsuario, Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { RegistroService } from 'src/app/services/registro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empleados',
  templateUrl: './crear-empleados.component.html',
  styleUrls: ['./crear-empleados.component.css']
})
export class CrearEmpleadosComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  @Output() cambioMostrar = new EventEmitter<boolean>()
  @Input() usuario: Usuario = {} as Usuario
  @Input() mostrar: boolean

  public formularioAlta: FormGroup

  areas: Area[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srvArea: AreaService,
    private srvDireccion: DireccionService,
    private srv: RegistroService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        telefono: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        idarea: ["", Validators.required],
        calle: ["", Validators.required],
        altura: ["", Validators.required],
        idpais: ["", Validators.required],
        idprovincia: ["", Validators.required],
        idlocalidad: ["", Validators.required],
        idbarrio: ["", Validators.required],
        iddireccion: [""],
      }
    )
  }

  ngOnInit(): void {
    this.completarListas()
    
    this.suscripcion.add(
      this.srvArea.obtenerAreas(this.usuario.idempresa).subscribe({
        next:(areas) => {
          this.areas = areas
          
        },
      })
    )
  }

  completarListas(){

    
    this.suscripcion.add(this.srvDireccion.obtenerPaises().subscribe({
      next: (paises) =>{
        this.paises = paises
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))
    this.suscripcion.add(
      this.formularioAlta.controls['idpais'].valueChanges.subscribe({
        next: (idpais) =>{
          this.suscripcion.add(this.srvDireccion.obtenerProvincias(idpais).subscribe({
            next: (provincias) =>{
              this.provincias = provincias
              this.localidades = []
              this.barrios = []
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
    this.suscripcion.add(
      this.formularioAlta.controls['idprovincia'].valueChanges.subscribe({
        next: (idprovincia) =>{
          this.suscripcion.add(this.srvDireccion.obtenerLocalidades(idprovincia).subscribe({
            next: (localidades) =>{
              this.localidades = localidades
              this.barrios = []
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
    this.suscripcion.add(
      this.formularioAlta.controls['idlocalidad'].valueChanges.subscribe({
        next: (idlocalidad) =>{
          this.suscripcion.add(this.srvDireccion.obtenerBarrios(idlocalidad).subscribe({
            next: (barrios) =>{
              this.barrios = barrios
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  guardar(){
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      
      let direccion: ResumeDireccion = {
        "calle": this.formularioAlta.value.calle,
        "altura": this.formularioAlta.value.altura,
        "idbarrio": this.formularioAlta.value.idbarrio
      }

      this.suscripcion.add(this.srvDireccion.guardarDireccionEmpleado(direccion).subscribe({
        next: (direccion)=>{
          this.guardarEmpleado(direccion.iddireccion)
        },
        error: (err) => {
          this.mostrarMsjError(err.error.message);
        }
      }))
    }
  }

  guardarEmpleado(iddireccion: number) {

    let empleado: Usuario = this.formularioAlta.value
    empleado.iddireccion = iddireccion
    empleado.idempresa = this.usuario.idempresa

    Swal.fire({
      title: '¿Desea registrar este nuevo empleado?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.srv.registrarEmpleado(empleado).subscribe({
          next: (empleadoResponse) => {

            if (empleadoResponse) {

              Swal.fire({
                title: 'Empleado creado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              }).then((result) => {
                if (result.isConfirmed) {
  
                  let currentUrl = this.router.url;
                  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this.router.navigate([currentUrl]);
                  });
      
                }
              })
              
            }
          },
          error: (err) => {
            Swal.fire({
              title: '¡No se pudo crear el empleado!',
              icon: 'error'
            })
          }
        })
      }
    })
  }

  cancelar(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
  }

  irMasiva(){
    this.router.navigate(['/pages/empleados/masiva'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
