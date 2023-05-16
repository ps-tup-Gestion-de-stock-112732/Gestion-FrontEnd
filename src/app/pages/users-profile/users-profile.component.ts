import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Barrio } from 'src/app/interfaces/barrio';
import { Direccion, ResumeDireccion } from 'src/app/interfaces/direccion';
import { ResumeEmpresa } from 'src/app/interfaces/empresa';
import { Localidad } from 'src/app/interfaces/localidad';
import { Pais } from 'src/app/interfaces/pais';
import { Provincia } from 'src/app/interfaces/provincia';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario, ResumeUsuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.css']
})
export class UsersProfileComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  public formularioModificacion: FormGroup
  public formularioPassword: FormGroup

  mensajeErrores: String[]
  mensajeError: String = ""
  mensajeErrorPass: String = ""

  usuario: Usuario
  empresa: ResumeEmpresa
  rol: Rol
  rolNombre: string
  direccion: Direccion
  area: Area

  areas: Area[]
  paises: Pais[]
  provincias: Provincia[]
  localidades: Localidad[]
  barrios: Barrio[]

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvRol: RolService,
    private srvDireccion: DireccionService,
    private srvArea: AreaService,
    public fb: FormBuilder,
    public fbp: FormBuilder,
  ) { 
    this.formularioModificacion = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        telefono: ["", Validators.required],
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

    this.formularioPassword = this.fbp.group(
      {
        password: ["", Validators.required],
        passwordReing: ["", Validators.required]
      }
    )
  }
  

  ngOnInit(): void {
    this.subs.add(
      this.srvUsuario.obtenerUsuario(this.srv.getUser().idusuario).subscribe({
        next:(usr) => {
          this.usuario = usr

          if(this.usuario.idempresa){
            this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
              next: (empresa) => {
                this.empresa = empresa
              },
            })
          }

          this.srvRol.obtenerRol(this.usuario.idrol).subscribe({
            next:(rol) => {
              this.rol = rol
              this.rolNombre = rol.nombre
            },
          })

          if (this.usuario.idrol == 5) {

            this.srvArea.obtenerArea(this.usuario.idarea).subscribe({
              next:(area) => {
                this.area = area
              }
            })

            this.obtenerDireccion(this.usuario)
            this.completarListas()
          }

          setTimeout(() => {
            this.formularioModificacion.patchValue(this.usuario)
          }, 100);
          
        },
      })
    )
  }
  
  
  completarListas(){

    this.subs.add(
      this.srvArea.obtenerAreas(this.usuario.idempresa).subscribe({
        next:(areas) => {
          this.areas = areas
        },
      })
    )
    this.subs.add(this.srvDireccion.obtenerPaises().subscribe({
      next: (paises) =>{
        this.paises = paises
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))
    this.subs.add(
      this.formularioModificacion.controls['idpais'].valueChanges.subscribe({
        next: (idpais) =>{
          this.subs.add(this.srvDireccion.obtenerProvincias(idpais).subscribe({
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
    this.subs.add(
      this.formularioModificacion.controls['idprovincia'].valueChanges.subscribe({
        next: (idprovincia) =>{
          this.subs.add(this.srvDireccion.obtenerLocalidades(idprovincia).subscribe({
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
    this.subs.add(
      this.formularioModificacion.controls['idlocalidad'].valueChanges.subscribe({
        next: (idlocalidad) =>{
          this.subs.add(this.srvDireccion.obtenerBarrios(idlocalidad).subscribe({
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

  obtenerDireccion(usuario: Usuario){

    this.srvDireccion.obtenerDireccion(usuario.iddireccion).subscribe({
      next: (direccion) => {
        this.direccion = direccion
        this.srvDireccion.obtenerBarrio(direccion.idbarrio).subscribe({
          next:(barrio) =>{
            this.direccion.barrio = barrio
            this.srvDireccion.obtenerLocalidad(barrio.idlocalidad).subscribe({
              next:(localidad) =>{
                this.direccion.localidad = localidad
                this.srvDireccion.obtenerProvincia(localidad.idprovincia).subscribe({
                  next:(provincia) =>{
                    this.direccion.provincia = provincia
                    this.srvDireccion.obtenerPais(provincia.idprovincia).subscribe({
                      next:(pais) =>{
                        this.direccion.pais = pais
                        
                        this.usuario.direccion = this.direccion.calle+' '+this.direccion.altura+' '+this.direccion.barrio.nombre+
                        ', '+this.direccion.localidad.nombre+', '+this.direccion.provincia.nombre+', '+this.direccion.pais.nombre

                        this.formularioModificacion.patchValue(this.direccion);

                        this.formularioModificacion.patchValue(this.area);
                              
                        this.formularioModificacion.patchValue(pais);
                        this.formularioModificacion.patchValue(provincia);
                        this.formularioModificacion.patchValue(localidad);
                        this.formularioModificacion.patchValue(barrio);

                        

                      },
                    })
                  },
                })
              },
            })
          },
        })
      },
    })
  }

  actualizar(){
    if (this.formularioModificacion.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      try {
        if (this.usuario.email != this.formularioModificacion.value.email) {
          Swal.fire({
            title: 'Está modificando su email!',
            text: 'Al finalizar el guardado será redirigido al login',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#000',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
          }).then((result) => {
            if (result.isConfirmed) {
              this.validarCambioDireccion(true)
            }
          })
        }else{
          this.validarCambioDireccion(false)
        }
      } catch (error) {
        Swal.fire({
          title: '¡No se pudo realizar la operación!',
          icon: 'error'
        })
      }
      
    }
  }

  validarCambioDireccion(redirect: boolean) {

    let direccion: ResumeDireccion = {
      "iddireccion": this.usuario.iddireccion,
      "calle": this.formularioModificacion.value.calle,
      "altura": this.formularioModificacion.value.altura,
      "idbarrio": this.formularioModificacion.value.idbarrio
    }

    Swal.fire({
      title: '¿Seguro desea modificar sus datos?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        if (this.usuario.idrol == 5) {
          this.subs.add(this.srvDireccion.actualizarDireccionEmpleado(direccion).subscribe({
            next: (d)=>{
              
              this.actualizarUsuario(redirect)
            },
            error: (err) => {
              this.mostrarMsjErrores(err.error.errors);
            }
          }))
        }else{
          this.actualizarUsuario(redirect)
        }
        
      }
    })
  }

  actualizarUsuario(redirect: boolean){

    let usr: ResumeUsuario = {
      'idusuario': this.usuario.idusuario,
      'nombre': this.formularioModificacion.value.nombre,
      'apellido': this.formularioModificacion.value.apellido,
      'email': this.formularioModificacion.value.email,
      'telefono': this.formularioModificacion.value.telefono,
      'nro_documento': this.formularioModificacion.value.nro_documento,
      'idarea': this.formularioModificacion.value.area,
    }

    this.srvUsuario.updateUsuario(usr).subscribe({
      next: (usuarioResponse) => {

        if (usuarioResponse) {
          Swal.fire({
            title: 'Usuario actualizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#007bff'
          }).then((result) => {

            if (redirect) {
              this.srv.logout()
              this.router.navigate(['/pages-login'])
            }
            
          })
        }
      },
      error:(err) => {
        this.mostrarMsjErrores(err.error.errors);
      },
    })
  }

  actualizarPassword(){
    if (this.formularioPassword.invalid || this.formularioPassword.value.password != this.formularioPassword.value.passwordReing) {
      this.mostrarMsjErrorPass('Existen campos nulos o no son coincidentes');
    } else {
      
      Swal.fire({
        title: '¿Desea modificar su contraseña?',
        text: 'Al finalizar el guardado será redirigido al login',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          try {

            let pass = this.formularioPassword.value.password
            
              this.subs.add(this.srvUsuario.updateUsuarioPassword(this.usuario.idusuario, pass).subscribe({
                next: (usuarioResponse)=>{

                  if (usuarioResponse) {
                    Swal.fire({
                      title: 'Contraseña actualizada con éxito',
                      icon: 'success',
                      confirmButtonText: 'Aceptar',
                      confirmButtonColor: '#007bff'
                    }).then((result) => {
                      if (result.isConfirmed) {
            
                        this.srv.logout()
                        this.router.navigate(['/pages-login'])
                      }
                    })
                  }
                },
                error: (err) => {
                  this.mostrarMsjErrorPass(err.error.message);
                },
              }))
          } catch (error) {
            Swal.fire({
              title: '¡No se pudo realizar la operación!',
              icon: 'error'
            })
          }
        }
      })
    }
  }

  cancelar(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  mostrarMsjErrores(errores: any[]) {
    let mensajes : String[] = []

    for (let i = 0; i < errores.length; i++) {
      mensajes.push(errores[i].msg)
    }
    
    this.mensajeErrores = mensajes;
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

  mostrarMsjErrorPass(error: String) {
    this.mensajeErrorPass = error;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
