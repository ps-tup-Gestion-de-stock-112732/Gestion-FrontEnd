import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PedidoXDetalle } from 'src/app/interfaces/pedido';
import { SolicitudGestion } from 'src/app/interfaces/solicitudGestion';
import { SolicitudGestionXPedido } from 'src/app/interfaces/solicitudGestionXPedido';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudGestionService } from 'src/app/services/solicitud-gestion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-sol-ventas',
  templateUrl: './detalle-sol-ventas.component.html',
  styleUrls: ['./detalle-sol-ventas.component.css']
})
export class DetalleSolVentasComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  usuario: Usuario = {} as Usuario
  solicitud: SolicitudGestionXPedido

  cant: number = 1

  idautorizacion: number

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService,
    private srvProveedor: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private srvCategoria: CategoriaService,
    private srvPedido: PedidoService,
    private srvSolicitudGestion: SolicitudGestionService,
    private srvEmpresa: EmpresaService,
    private srvEstado: EstadoService
  ) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    this.idautorizacion = this.activatedRoute.snapshot.params['id']

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario
          this.obtenerSolicitud()
          
        }
      })
    ) 
  }

  obtenerSolicitud(){
    
    this.srvSolicitudGestion.obtenerSolicitud(this.idautorizacion).subscribe({
      next:(solicitudResponse) => {

          let solicitudGestion: SolicitudGestionXPedido = {} as SolicitudGestionXPedido
          let pedido: PedidoXDetalle = {} as PedidoXDetalle
          let solicitud: SolicitudGestion = {} as SolicitudGestion
          solicitudGestion.pedido = pedido
          solicitudGestion.solicitud = solicitud

          this.srvUsuario.obtenerEmpleado(solicitudResponse.idempleado).subscribe({
            next:(empleado) => {

              solicitudGestion.pedido.datosEmpleado = empleado
              
              this.srvProducto.obtenerProducto(solicitudResponse.idproducto).subscribe({
                next:(producto) => {
                  
                  solicitudGestion.pedido.producto = producto

                  this.srvEmpresa.obtenerEmpresa(solicitudResponse.idproveedor).subscribe({
                    next:(proveedor) =>{
        
                      solicitudGestion.pedido.datosProveedor = proveedor
        
                      this.srvEstado.obtenerEstadoGestion(solicitudResponse.idestado).subscribe({
                        next:(estado) => {

                          solicitudGestion.solicitud.idautorizacion = solicitudResponse.idautorizacion
                          solicitudGestion.pedido.fecha = solicitudResponse.fechapedido
                          solicitudGestion.solicitud.estado = estado

                          this.solicitud = solicitudGestion
                        }
                      })
                    }
                  })
                },
              })
            },
          })
      }
    })
  }

  aprobar(){

    Swal.fire({
      title: '¿Desea aprobar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const { value: comentarios } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'Agregue un comentario',
          inputPlaceholder: 'Escribe tu comentario aquí...',
          inputAttributes: {
            'aria-label': 'Escribe tu comentario aquí'
          },
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })

        this.srvSolicitudGestion.aprobarSolicitudVentas(this.idautorizacion, this.usuario.idusuario, comentarios).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha aprobado la solicitud con éxito!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.router.navigate(['/pages/solicitudes-ventas/lista'])
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo aprobar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          }
        })
      }
    })
  }

  rechazar(){

    Swal.fire({
      title: '¿Desea rechazar esta solicitud?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {

        const { value: comentarios } = await Swal.fire({
          input: 'textarea',
          inputLabel: 'Agregue un comentario',
          inputPlaceholder: 'Escribe tu comentario aquí...',
          inputAttributes: {
            'aria-label': 'Escribe tu comentario aquí'
          },
          showCancelButton: false,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Aceptar'
        })

        this.srvSolicitudGestion.rechazarSolicitud(this.idautorizacion, this.usuario.idusuario, comentarios).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha rechazado la solicitud con éxito!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.router.navigate(['/pages/solicitudes-ventas/lista'])
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo rechazar la solicitud',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          }
        })
      }
    })
  }
}
