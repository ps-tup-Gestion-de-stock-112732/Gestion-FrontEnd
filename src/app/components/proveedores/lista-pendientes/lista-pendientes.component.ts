import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthEmpresa } from 'src/app/interfaces/authEmpresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
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

  solicitudes: AuthEmpresa[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProveedor: EmpresaService,
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
    
    this.srvSolicitud.obtenerSolicitudesPendientes(this.usuario.idempresa).subscribe({
      next:(solicitudes) => {
        for (let i = 0; i < solicitudes.length; i++) {

          let solicitud = solicitudes[i]

          this.srvProveedor.obtenerEmpresa(solicitud.idempresaProveedor).subscribe({
            next:(proveedor) =>{

              solicitud.datosProveedor = proveedor
              this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                next:(estado) => {
                  solicitud.estado = estado.descripcion
                }
              })

              this.srvUsuario.obtenerUsuario(solicitud.idsolicitante).subscribe({
                next:(usuario) => {
                  solicitud.solicitante = usuario.apellido +', '+ usuario.nombre
                },
                error:(err) =>{
                  solicitud.solicitante = ''
                },
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
        this.srvSolicitud.obtenerProveedoresXSolicitud(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(solicitudes) =>{

            this.solicitudes = []

            for (let i = 0; i < solicitudes.length; i++) {

              let solicitud = solicitudes[i]

              this.srvProveedor.obtenerEmpresa(solicitud.idempresaProveedor).subscribe({
                next:(proveedor) =>{

                  solicitud.datosProveedor = proveedor
                  this.srvEstado.obtenerEstado(solicitud.idestado).subscribe({
                    next:(estado) => {
                      solicitud.estado = estado.descripcion
                    },
                    error:(err) =>{
                      solicitud.estado = ''
                    },
                  })
    
                  this.srvUsuario.obtenerUsuario(solicitud.idsolicitante).subscribe({
                    next:(usuario) => {
                      solicitud.solicitante = usuario.apellido +', '+ usuario.nombre
                    },
                    error:(err) =>{
                      solicitud.solicitante = ''
                    },
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

  cancelarSolicitud(idsolicitud: number){
    
    Swal.fire({
      title: '¿Desea cancelar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.srvSolicitud.cancelarSolicitudPendientes(idsolicitud).subscribe({
          next:(solicitudCancelada) => {
            Swal.fire({
              title: 'Su solicitud fue cancelada!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.obtenerSolicitudes()
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se puedo cancelar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          },
        })
      }
    })
  }

  nuevo(){
    this.router.navigate(['/pages/proveedores/lista'])
  }

  pendientes(){
    this.router.navigate(['/pages/proveedores/pendientes'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}