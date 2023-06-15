import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Empresa, InfoEmpresa } from 'src/app/interfaces/empresa';
import { Estado } from 'src/app/interfaces/estado';
import { PedidoXDetalle } from 'src/app/interfaces/pedido';
import { SolicitudGestion } from 'src/app/interfaces/solicitudGestion';
import { SolicitudGestionXPedido } from 'src/app/interfaces/solicitudGestionXPedido';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EstadoService } from 'src/app/services/estado.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudGestionService } from 'src/app/services/solicitud-gestion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-pedidos-proveedor',
  templateUrl: './lista-pedidos-proveedor.component.html',
  styleUrls: ['./lista-pedidos-proveedor.component.css']
})
export class ListaPedidosProveedorComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  estados: Estado[] = []
  empresas: InfoEmpresa[] = []
  solicitudes: SolicitudGestionXPedido[] = []
  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvSolicitud: SolicitudGestionService,
    private srvEstado: EstadoService,
    private srvProducto: ProductoService
  ) { 
    this.formularioBusqueda = this.fb.group({
      nombre: [""],
      idestado: [""],
      empresa: [""],
      fecha: [""]
    })
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:async (usuario) => {
          this.usuario = usuario
          await this.obtenerSolicitudes()
          await this.completarListas()
          
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
    
    this.srvSolicitud.obtenerSolicitudesXProveedor(this.usuario.idempresa).subscribe({
      next:(solicitudes) => {

        for (let i = 0; i < solicitudes.length; i++) {

          let solicitudGestion: SolicitudGestionXPedido = {} as SolicitudGestionXPedido
          let pedido: PedidoXDetalle = {} as PedidoXDetalle
          let solicitud: SolicitudGestion = {} as SolicitudGestion
          solicitudGestion.pedido = pedido
          solicitudGestion.solicitud = solicitud

          this.srvUsuario.obtenerEmpleado(solicitudes[i].idempleado).subscribe({
            next:(empleado) => {

              solicitudGestion.pedido.datosEmpleado = empleado
              
              this.srvProducto.obtenerProducto(solicitudes[i].idproducto).subscribe({
                next:(producto) => {
                  
                  solicitudGestion.pedido.producto = producto

                  this.srvEmpresa.obtenerEmpresa(solicitudes[i].idempresa).subscribe({
                    next:(empresa) =>{
        
                      solicitudGestion.pedido.datosEmpresa = empresa
        
                      this.srvEstado.obtenerEstadoGestion(solicitudes[i].idestado).subscribe({
                        next:(estado) => {

                          solicitudGestion.solicitud.idautorizacion = solicitudes[i].idautorizacion
                          solicitudGestion.solicitud.fecha = solicitudes[i].fecha
                          solicitudGestion.solicitud.estado = estado

                          this.solicitudes.push(solicitudGestion)

                        }
                      })
                    }
                  })
                },
              })
            },
          })
        }
      },
      error:(err) => {
        this.solicitudes = []
      }
    })

  }

  completarListas(){
    this.srvEstado.obtenerEstadosGestion().subscribe({
      next:(estados: Estado[]) => {
        this.estados = estados
        this.estados = estados.filter(e => e.idestado == 3 || e.idestado == 6 || e.idestado == 7 || e.idestado == 8 )

        this.estados.forEach(estado => {
          if (estado.idestado == 3) {
            estado.descripcion = 'Pendiente'
          }

          if (estado.idestado == 8) {
            estado.descripcion = 'Rechazado'
          }
        });

        this.srvSolicitud.obtenerEmpresas(this.usuario.idempresa).subscribe({
          next:(empresas: InfoEmpresa[]) => {
            this.empresas = empresas
          },
        })

      },
    })
  }


  limpiar(){
    this.formularioBusqueda.setValue({
      nombre: "",
      idestado: "",
      empresa: "",
      fecha: ""
    })
  }

  buscar(){

    let empleado = this.formularioBusqueda.value.nombre
    let estado = this.formularioBusqueda.value.idestado
    let empresa = this.formularioBusqueda.value.empresa
    let fecha = this.formularioBusqueda.value.fecha

    if (this.formularioBusqueda.invalid || (!empleado && !estado && !empresa && !fecha)) {
      this.obtenerSolicitudes()
    } else {
      this.suscripcion.add(
        this.srvSolicitud.obtenerSolicitudesfiltroXProveedor(empleado, estado, empresa, fecha,  this.usuario.idempresa).subscribe({
          next:(solicitudes) => {
            this.solicitudes = []

            for (let i = 0; i < solicitudes.length; i++) {

              let solicitudGestion: SolicitudGestionXPedido = {} as SolicitudGestionXPedido
              let pedido: PedidoXDetalle = {} as PedidoXDetalle
              let solicitud: SolicitudGestion = {} as SolicitudGestion
              solicitudGestion.pedido = pedido
              solicitudGestion.solicitud = solicitud
    
              this.srvUsuario.obtenerEmpleado(solicitudes[i].idempleado).subscribe({
                next:(empleado) => {
    
                  solicitudGestion.pedido.datosEmpleado = empleado
                  
                  this.srvProducto.obtenerProducto(solicitudes[i].idproducto).subscribe({
                    next:(producto) => {
                      
                      solicitudGestion.pedido.producto = producto
    
                      this.srvEmpresa.obtenerEmpresa(solicitudes[i].idempresa).subscribe({
                        next:(empresa) =>{
            
                          solicitudGestion.pedido.datosEmpresa = empresa
            
                          this.srvEstado.obtenerEstadoGestion(solicitudes[i].idestado).subscribe({
                            next:(estado) => {
    
                              solicitudGestion.solicitud.idautorizacion = solicitudes[i].idautorizacion
                              solicitudGestion.solicitud.fecha = solicitudes[i].fecha
                              solicitudGestion.solicitud.estado = estado
    
                              this.solicitudes.push(solicitudGestion)
                            }
                          })
                        }
                      })
                    },
                  })
                },
              })
            }
          },
        })
      )
    }
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}


