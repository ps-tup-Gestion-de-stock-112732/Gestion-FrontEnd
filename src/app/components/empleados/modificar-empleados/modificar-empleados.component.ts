import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Barrio } from 'src/app/interfaces/barrio';
import { ResumeDireccion } from 'src/app/interfaces/direccion';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-empleados',
  templateUrl: './modificar-empleados.component.html',
  styleUrls: ['./modificar-empleados.component.css']
})
export class ModificarEmpleadosComponent implements OnInit {

  public formulario: FormGroup

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  empleado: Usuario

  areas: Area[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srvUsuario: UsuarioService,
    private srvDireccion: DireccionService,
    private srvArea: AreaService
  ) { 
    this.formulario = this.fb.group({
      nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        telefono: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        password: [""],
        idarea: ["", Validators.required],
        calle: ["", Validators.required],
        altura: ["", Validators.required],
        idpais: ["", Validators.required],
        idprovincia: ["", Validators.required],
        idlocalidad: ["", Validators.required],
        idbarrio: ["", Validators.required],
        iddireccion: [""],
    })
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']

    this.suscripcion.add(
      this.srvUsuario.obtenerEmpleado(id).subscribe({
        next:(empleado) => {
          this.empleado = empleado
          this.srvDireccion.obtenerDireccion(empleado.iddireccion).subscribe({
            next:(direccion) =>{
              this.srvDireccion.obtenerBarrio(direccion.idbarrio).subscribe({
                next:(barrio) =>{
                  this.srvDireccion.obtenerLocalidad(barrio.idlocalidad).subscribe({
                    next:(localidad) =>{
                      this.srvDireccion.obtenerProvincia(localidad.idprovincia).subscribe({
                        next:(provincia) =>{
                          this.srvDireccion.obtenerPais(provincia.idpais).subscribe({
                            next:(pais) =>{

                              
                              this.formulario.patchValue(direccion);
                              
                              this.formulario.patchValue(pais);
                              this.formulario.patchValue(provincia);
                              this.formulario.patchValue(localidad);
                              this.formulario.patchValue(barrio);

                              empleado.password = ''
                              this.formulario.patchValue(empleado);

                              this.suscripcion.add(
                                this.srvArea.obtenerAreas(this.empleado.idempresa).subscribe({
                                  next:(areas) => {
                                    this.areas = areas
                                  },
                                })
                              )
                              
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            },
          })
        },
      })
    )

    this.completarListas()
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
      this.formulario.controls['idpais'].valueChanges.subscribe({
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
      this.formulario.controls['idprovincia'].valueChanges.subscribe({
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
      this.formulario.controls['idlocalidad'].valueChanges.subscribe({
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

  actualizar(){

    if (this.formulario.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      
      let direccion: ResumeDireccion = {
        "iddireccion": this.empleado.iddireccion,
        "calle": this.formulario.value.calle,
        "altura": this.formulario.value.altura,
        "idbarrio": this.formulario.value.idbarrio
      }

      Swal.fire({
        title: '¿Seguro/a desea actualizar los datos de este empleado?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {

        if (result.isConfirmed) {

          this.suscripcion.add(this.srvDireccion.actualizarDireccionEmpleado(direccion).subscribe({
            next: (direccion)=>{
              this.actualizarEmpleado(direccion.iddireccion)
            },
            error: (err) => {
              this.mostrarMsjError(err.error.message);
            }
          }))
        }
      })
    }
  }

  actualizarEmpleado(iddireccion: number) {

    
    let empleado: Usuario = this.formulario.value
    empleado.idusuario = this.empleado.idusuario
    empleado.iddireccion = iddireccion
    empleado.idempresa = this.empleado.idempresa

    console.log(empleado);

    this.srvUsuario.updateEmpleado(empleado).subscribe({
      next: (empleadoResponse) => {

        if (empleadoResponse) {

          Swal.fire({
            title: 'Empleado actualizado con éxito',
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
          title: '¡No se pudo actualizar el empleado!',
          icon: 'error'
        })
      }
    })
  }

  cancelar(){
    this.router.navigate(['/pages/empleados/main'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
