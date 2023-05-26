import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SolicitudUsuario } from 'src/app/interfaces/solicitudUsuario';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EstadoService } from 'src/app/services/estado.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-pendientes',
  templateUrl: './lista-pendientes.component.html',
  styleUrls: ['./lista-pendientes.component.css']
})
export class ListaPendientesComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  solicitudes: SolicitudUsuario[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvSolicitud: SolicitudService,
    private srvEstado: EstadoService
  ) { 
    this.formularioBusqueda = this.fb.group({
      busqueda: ["", Validators.required]
    })
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.obtenerSolicitudes()
          
        },
        error:(err) => {
          this.solicitudes = []
        }
      })
    ) 
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerSolicitudes(){

    this.solicitudes = []
    
    this.srvSolicitud.obtenerSolicitudesPendientesXProveedor(this.usuario.idempresa).subscribe({
      next:(solicitudes) => {

        for (let i = 0; i < solicitudes.length; i++) {

          let solicitud = solicitudes[i]

          this.srvUsuario.obtenerUsuario(solicitud.idusuario).subscribe({
            next:(usuario) =>{

              solicitud.datosUsuario = usuario
              this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                next:(estado) => {
                  solicitud.estado = estado.descripcion
                }
              })

              this.solicitudes.push(solicitud)
            }
          })
        }
      },
      error:(err) => {
        this.solicitudes = []
      }
    })
  }


  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerSolicitudes()
    } else {
      this.suscripcion.add(
        this.srvSolicitud.obtenerUsuariosProvXSolicitud(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(solicitudes) =>{

            this.solicitudes = []

            for (let i = 0; i < solicitudes.length; i++) {

              let solicitud = solicitudes[i]
    
              this.srvUsuario.obtenerUsuario(solicitud.idusuario).subscribe({
                next:(usuario) =>{
    
                  solicitud.datosUsuario = usuario
                  this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                    next:(estado) => {
                      solicitud.estado = estado.descripcion
                    }
                  })
    
                  this.solicitudes.push(solicitud)
                }
              })
              
            }
          },
          error:(err) => {
            this.solicitudes = []
          }
        })
      )
    }
  }

  aprobar(sol: SolicitudUsuario){

    let usr: Usuario = {} as Usuario
    usr.idusuario = sol.datosUsuario.idusuario
    usr.idempresa = sol.idempresa
    
    Swal.fire({
      title: '¿Desea aprobar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvSolicitud.aprobarSolicitudPendientesUsuarioProveedor(sol.idautorizacion).subscribe({
          next:(solicitudAprobada) => {
            
            this.srvUsuario.updateUsuarioProveedor(usr).subscribe({
              next:(u) => {

                if (u) {
                  Swal.fire({
                    title: 'Su solicitud fue aprobada',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#007bff'
                  }).then((result) => {
                    if (result.isConfirmed) {

                      this.obtenerSolicitudes()
          
                    }
                  })
                }
              },
              error: (err) => {
                Swal.fire({
                  title: '¡No se pudo actualizar el usuario!',
                  icon: 'error'
                })
              }
            })

            this.obtenerSolicitudes()
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se puedo aprobar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          },
        })
      }
    })
  }

  rechazar(idsolicitud: number){
    
    Swal.fire({
      title: '¿Desea rechazar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvSolicitud.rechazarSolicitudPendientesUsuarioProveedor(idsolicitud).subscribe({
          next:(solicitudRechazada) => {
            Swal.fire({
              title: 'Su solicitud fue rechazada!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.obtenerSolicitudes()
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se puedo rechazar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          },
        })
      }
    })
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}

