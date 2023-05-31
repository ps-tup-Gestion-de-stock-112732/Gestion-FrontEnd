import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  selector: 'app-perfil-empleado',
  templateUrl: './perfil-empleado.component.html',
  styleUrls: ['./perfil-empleado.component.css']
})
export class PerfilEmpleadoComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  estados: Estado[] = []
  solicitudes: SolicitudGestionXPedido[] = []
  empleado: Usuario = {} as Usuario

  idempleado: number
  solicitudPrevia: number

  cantidadProductos: number = 0
  precioTotalProdcutos: number = 0

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private srvSolicitud: SolicitudGestionService,
    private srvEstado: EstadoService,
    private srvContrato: ContratoService,
    private srvProducto: ProductoService
  ) { 
    this.formularioBusqueda = this.fb.group({
      nombre: [""],
      idestado: [""]
    })
  }

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe(
      params => {
        this.idempleado =  params['empleado'];
        this.solicitudPrevia =params['solicitud'];
      }
    )

    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(this.idempleado).subscribe({
        next:async (usuario) => {
          this.empleado = usuario
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
    
    this.srvSolicitud.obtenerSolicitudesXEmpleado(this.empleado.idusuario).subscribe({
      next:(solicitudes) => {

        for (let i = 0; i < solicitudes.length; i++) {

          if (solicitudes[i].idestado == 3) {

            let solicitudGestion: SolicitudGestionXPedido = {} as SolicitudGestionXPedido
            let pedido: PedidoXDetalle = {} as PedidoXDetalle
            let solicitud: SolicitudGestion = {} as SolicitudGestion
            solicitudGestion.pedido = pedido
            solicitudGestion.solicitud = solicitud
                
            this.srvProducto.obtenerProducto(solicitudes[i].idproducto).subscribe({
              next:(producto) => {
                
                this.cantidadProductos+= producto.cantidad
                this.precioTotalProdcutos+= producto.cantidad * producto.precioUnitario

                solicitudGestion.pedido.producto = producto

                this.srvEmpresa.obtenerEmpresa(solicitudes[i].idproveedor).subscribe({
                  next:(proveedor) =>{
      
                    solicitudGestion.pedido.datosProveedor = proveedor
      
                    this.srvEstado.obtenerEstadoGestion(solicitudes[i].idestado).subscribe({
                      next:(estado) => {

                        solicitudGestion.solicitud.idautorizacion = solicitudes[i].idautorizacion
                        solicitudGestion.solicitud.estado = estado

                        this.solicitudes.push(solicitudGestion)
                      }
                    })
                  }
                })
              },
            })
          }
        }
      },
      error:(err) => {
        this.solicitudes = []
      }
    })

  }

  completarListas(){
    this.srvEstado.obtenerEstadosGestion().subscribe({
      next:(estados) => {
        this.estados = estados
      },
    })
  }


  limpiar(){
    this.formularioBusqueda.setValue({
      nombre: "",
      idestado: "",
    })
  }

  buscar(){

    let empleado = this.formularioBusqueda.value.nombre
    let estado = this.formularioBusqueda.value.idestado

    if (this.formularioBusqueda.invalid || (!empleado && !estado)) {
      this.obtenerSolicitudes()
    } else {
      this.suscripcion.add(
        this.srvSolicitud.obtenerSolicitudesfiltro(this.formularioBusqueda.value.nombre, this.formularioBusqueda.value.idestado, this.empleado.idempresa).subscribe({
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
    
                      this.srvEmpresa.obtenerEmpresa(solicitudes[i].idproveedor).subscribe({
                        next:(proveedor) =>{
            
                          solicitudGestion.pedido.datosProveedor = proveedor
            
                          this.srvEstado.obtenerEstadoGestion(solicitudes[i].idestado).subscribe({
                            next:(estado) => {
    
                              solicitudGestion.solicitud.idautorizacion = solicitudes[i].idautorizacion
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