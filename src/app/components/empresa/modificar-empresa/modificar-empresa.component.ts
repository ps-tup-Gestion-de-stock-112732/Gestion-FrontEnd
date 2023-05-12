import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barrio } from 'src/app/interfaces/barrio';
import { ResumeDireccion } from 'src/app/interfaces/direccion';
import { Empresa, ResumeEmpresa } from 'src/app/interfaces/empresa';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Usuario } from 'src/app/interfaces/usuario';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-empresa',
  templateUrl: './modificar-empresa.component.html',
  styleUrls: ['./modificar-empresa.component.css']
})
export class ModificarEmpresaComponent implements OnInit {

  @Input() usuario: Usuario = {} as Usuario
  
  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  empresa: Empresa

  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  public formularioModificacion: FormGroup

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvDireccion: DireccionService
  ) { 
    this.formularioModificacion = this.fb.group(
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

    if(this.usuario.esAdmin != 1) this.formularioModificacion.disable();

    this.suscripcion.add(
      this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
        next:(empresa) => {
          this.empresa = empresa
          this.srvDireccion.obtenerDireccion(empresa.iddireccion).subscribe({
            next:(direccion) =>{
              this.srvDireccion.obtenerBarrio(direccion.idbarrio).subscribe({
                next:(barrio) =>{
                  this.srvDireccion.obtenerLocalidad(barrio.idlocalidad).subscribe({
                    next:(localidad) =>{
                      this.srvDireccion.obtenerProvincia(localidad.idprovincia).subscribe({
                        next:(provincia) =>{
                          this.srvDireccion.obtenerPais(provincia.idpais).subscribe({
                            next:(pais) =>{

                              
                              this.formularioModificacion.patchValue(direccion);
                              
                              this.formularioModificacion.patchValue(pais);
                              this.formularioModificacion.patchValue(provincia);
                              this.formularioModificacion.patchValue(localidad);
                              this.formularioModificacion.patchValue(barrio);

                              this.formularioModificacion.patchValue(empresa);
                              
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
      this.formularioModificacion.controls['idpais'].valueChanges.subscribe({
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
      this.formularioModificacion.controls['idprovincia'].valueChanges.subscribe({
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
      this.formularioModificacion.controls['idlocalidad'].valueChanges.subscribe({
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
    if (this.formularioModificacion.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      
      let direccion: ResumeDireccion = {
        "iddireccion": this.empresa.iddireccion,
        "calle": this.formularioModificacion.value.calle,
        "altura": this.formularioModificacion.value.altura,
        "idbarrio": this.formularioModificacion.value.idbarrio
      }

      Swal.fire({
        title: '¿Desea modificar los datos de esta empresa?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.suscripcion.add(this.srvDireccion.actualizarDireccionEmpresa(direccion).subscribe({
            next: (d)=>{
              
              this.actualizarEmpresa(d.iddireccion)
            },
            error: (err) => {
              Swal.fire({
                title: '¡No se pudo actualizar la direccion de la empresa!',
                icon: 'error'
              })
            }
          }))
          
        }
      })
    }
  }

  actualizarEmpresa(iddireccion: number){

    let empresa: ResumeEmpresa = {
      'idempresa': this.empresa.idempresa,
      'nombre': this.formularioModificacion.value.nombre,
      'telefono': this.formularioModificacion.value.telefono,
      'cuit': this.formularioModificacion.value.cuit,
      'iddireccion': iddireccion
    }

    this.srvEmpresa.actualizarEmpresa(empresa).subscribe({
      next: (empresaResponse) => {

        if (empresaResponse) {
          Swal.fire({
            title: 'Empresa actualizada con éxito',
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
          title: '¡No se pudo realizar la operación!',
          icon: 'error'
        })
      }
    })
  }

  baja(){

    Swal.fire({
      title: '¿Desea dar de baja esta empresa?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.suscripcion.add(this.srvEmpresa.bajaEmpresa(this.empresa.idempresa).subscribe({
          next: (e)=>{
            if (e) {
              Swal.fire({
                title: 'Empresa eliminada con éxito',
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
              title: '¡No se pudo dar de baja la empresa!',
              icon: 'error'
            })
          }
        }))
        
      }
    })

  }

  desvincular(){

    Swal.fire({
      title: '¿Desea desvincular esta empresa de su cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.suscripcion.add(this.srv.desvincularEmpresa(this.usuario.idusuario).subscribe({
          next: (usr)=>{
            if (usr) {
              Swal.fire({
                title: 'Empresa desvinculada con éxito de su cuenta!',
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
              title: '¡No se pudo desvincular la empresa de su cuenta!',
              icon: 'error'
            })
          }
        }))
        
      }
    })

  }

  cancelar(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 3000);
  }

}
