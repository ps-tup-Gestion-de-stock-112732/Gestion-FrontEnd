import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { SolicitudUsuario } from 'src/app/interfaces/solicitudUsuario';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-en-espera',
  templateUrl: './en-espera.component.html',
  styleUrls: ['./en-espera.component.css']
})
export class EnEsperaComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  solicitud: SolicitudUsuario = {} as SolicitudUsuario
  usuario: Usuario = {} as Usuario
  empresa: Empresa = {} as Empresa

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvSolicitud: SolicitudService,
    private srvEmpresa: EmpresaService
  ) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvSolicitud.solicitudPendientesUsuarioEmpresa(this.usuario.idusuario).subscribe({
            next:(solicitud) => {

              this.solicitud = solicitud[0]

              this.srvEmpresa.obtenerEmpresa(solicitud[0].idempresa).subscribe({
                next:(empresa) => {
                  this.empresa = empresa
                },
              })
              
            },
          })

        }
      })
    )
  }

  cancelarSolicitud(){
    
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
        this.srvSolicitud.cancelarSolicitudPendientesUsuarioEmpresa(this.solicitud.idautorizacion).subscribe({
          next:(solicitudCancelada) => {
            Swal.fire({
              title: 'Su solicitud fue cancelada!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed) {

                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                  this.router.navigate([currentUrl]);
                });
    
              }
            })
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

}
