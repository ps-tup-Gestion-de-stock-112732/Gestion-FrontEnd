import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barrio } from 'src/app/interfaces/barrio';
import { Direccion, ResumeDireccion } from 'src/app/interfaces/direccion';
import { Empresa, ResumeEmpresa } from 'src/app/interfaces/empresa';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  public formularioAlta: FormGroup

  roles: Rol[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  idpais: Number
  idprovincia: Number
  idlocalidad: Number
  idbarrio: Number

  @Output() cambioMostrar = new EventEmitter<boolean>()
  @Input() mostrar: boolean
  @Input() usuario: Usuario = {} as Usuario

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvDireccion: DireccionService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        cuit: ["", Validators.required],
        telefono: ["", Validators.required],
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

  mostarForm(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
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

      this.suscripcion.add(this.srvDireccion.guardarDireccionEmpresa(direccion).subscribe({
        next: (direccion)=>{
          this.guardarEmpresa(direccion.iddireccion)
        },
        error: (err) => {
          this.mostrarMsjError(err.error.message);
        }
      }))
    }
  }

  
  guardarEmpresa(iddireccion: number) {

    let empresa: ResumeEmpresa = {
      'nombre': this.formularioAlta.value.nombre,
      'telefono': this.formularioAlta.value.telefono,
      'cuit': this.formularioAlta.value.cuit,
      'iddireccion': iddireccion
    }

    Swal.fire({
      title: '¿Desea registrar esta nueva empresa a su cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.srvEmpresa.registrarEmpresa(empresa).subscribe({
          next: (empresaResponse) => {

            if (empresaResponse) {

              this.usuario.idempresa = empresaResponse.idempresa
              this.usuario.esAdmin = 1

              this.srv.updateUsuarioEmpresa(this.usuario).subscribe({
                next:(value) => {
                  Swal.fire({
                    title: 'Empresa creada con éxito',
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
                },
                error: (err) => {
                  Swal.fire({
                    title: '¡No se pudo asociar la empresa al usuario!',
                    icon: 'error'
                  })
                }
              })
            }
          },
          error: (err) => {
            Swal.fire({
              title: '¡No se pudo crear la empresa!',
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

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

}
