import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Direccion } from 'src/app/interfaces/direccion';
import { PedidoXDetalle } from 'src/app/interfaces/pedido';
import { SolicitudGestion } from 'src/app/interfaces/solicitudGestion';
import { SolicitudGestionXPedido } from 'src/app/interfaces/solicitudGestionXPedido';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstadoService } from 'src/app/services/estado.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudGestionService } from 'src/app/services/solicitud-gestion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styleUrls: ['./detalle-pedido.component.css']
})
export class DetallePedidoComponent implements OnInit, OnDestroy {

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
    private activatedRoute: ActivatedRoute,
    private srvSolicitudGestion: SolicitudGestionService,
    private srvEmpresa: EmpresaService,
    private srvEstado: EstadoService,
    private srvDireccion: DireccionService
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

                  this.srvEmpresa.obtenerEmpresa(solicitudResponse.idempresa).subscribe({
                    next:(empresa) =>{
        
                      solicitudGestion.pedido.datosEmpresa = empresa

                      this.srvUsuario.obtenerEmpleado(solicitudResponse.idempleado).subscribe({
                        next:(empleado) => {
                          
                          solicitudGestion.pedido.datosEmpleado = empleado

                          this.srvEstado.obtenerEstadoGestion(solicitudResponse.idestado).subscribe({
                            next: async(estado) => {
    
                              solicitudGestion.solicitud.idautorizacion = solicitudResponse.idautorizacion
                              solicitudGestion.pedido.fecha = solicitudResponse.fechapedido
                              solicitudGestion.solicitud.estado = estado
    
                              this.solicitud = solicitudGestion
                              await this.obtenerDireccion(empleado.iddireccion)

                            }
                          })
                        },
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

  obtenerDireccion(iddireccion: number) {
    let dire: Direccion = {} as Direccion
    this.srvDireccion.obtenerDireccion(iddireccion).subscribe({
      next: (direccion) => {
        dire = direccion
        
        this.srvDireccion.obtenerBarrio(dire.idbarrio).subscribe({
          next:(barrio) =>{
            dire.barrio = barrio

            this.srvDireccion.obtenerLocalidad(dire.barrio.idlocalidad).subscribe({
              next:(localidad) =>{
                dire.localidad = localidad

                this.srvDireccion.obtenerProvincia(dire.localidad.idprovincia).subscribe({
                  next:(provincia) =>{
                    dire.provincia = provincia

                    this.srvDireccion.obtenerPais(dire.provincia.idprovincia).subscribe({
                      next:(pais) =>{
                        dire.pais = pais

                        this.solicitud.pedido.datosEmpleado.direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
                        ', '+dire.localidad.nombre+', '+dire.provincia.nombre+', '+dire.pais.nombre

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

  aprobar(){

    Swal.fire({
      title: '¿Desea marcar como enviada esta compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {

        this.srvSolicitudGestion.enviarPedido(this.idautorizacion, this.usuario.idusuario).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha marcado el pedido como enviado!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.router.navigate(['/pages/pedidos-proveedor/lista'])
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo marcar como enviado el pedido',
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
      title: '¿Desea rechazar este pedido?',
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

        this.srvSolicitudGestion.rechazarPedido(this.idautorizacion, this.usuario.idusuario, comentarios).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha rechazado el pedido con éxito!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.router.navigate(['/pages/pedidos-proveedor/lista'])
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo rechazar el pedido',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })
          }
        })
      }
    })
  }

  entregar(){

    Swal.fire({
      title: '¿Desea marcar como entregada esta compra?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {

        this.srvSolicitudGestion.entregarPedido(this.idautorizacion, this.usuario.idusuario).subscribe({
          next:(solicitud) => {

            Swal.fire({
              title: 'Se ha marcado el pedido como entregado!',
              icon: 'success',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Aceptar'
            })

            this.router.navigate(['/pages/pedidos-proveedor/lista'])
            
          },
          error:(err) =>{
            Swal.fire({
              title: 'No se pudo marcar como entregado el pedido',
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

