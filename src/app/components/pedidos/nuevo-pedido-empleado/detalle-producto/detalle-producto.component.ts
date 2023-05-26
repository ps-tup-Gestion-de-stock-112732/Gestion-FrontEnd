import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { SolicitudGestionService } from 'src/app/services/solicitud-gestion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription();

  usuario: Usuario = {} as Usuario
  producto: Producto = {} as Producto

  cant: number = 1

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService,
    private srvProveedor: EmpresaService,
    private activatedRoute: ActivatedRoute,
    private srvCategoria: CategoriaService,
    private srvPedido: PedidoService,
    private srvSolicitudGestion: SolicitudGestionService
  ) { }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    const idproducto = this.activatedRoute.snapshot.params['id']

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvProducto.obtenerProducto(idproducto).subscribe({
        next:(producto) => {

          this.srvProveedor.obtenerEmpresa(producto.idProveedor).subscribe({
            next:(proveedor) => {
              producto.datosProveedor = proveedor

              this.srvCategoria.obtenerCategoria(producto.idcategoria).subscribe({
                next:(categoria) => {
                  producto.categoria = categoria

                  this.producto = producto


                  this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
                    next:(usuario) => {

                      this.usuario = usuario
                    }
                  })
                },
              })
            },
          })
        },
      })
    )
  }


  restar(){
    if (this.cant > 1) {
      this.cant--
    }
  }

  sumar(){
    if (this.cant < this.producto.cantidad) {
      this.cant++
    }
  }

  solicitar(){
    Swal.fire({
      title: '¿Desea solicitar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.suscripcion.add(
          this.srvPedido.generarPedido(this.usuario, this.producto, this.cant).subscribe({
            next:(pedido) => {

              this.srvSolicitudGestion.generarSolicitud(pedido.idpedido).subscribe({
                next:(solicitud) => {

                  this.srvProducto.actualizarCantidadProducto(this.producto.codigo, this.cant).subscribe({
                    next:(producto) => {

                      Swal.fire({
                        title: 'Solicitud enviada con éxito',
                        text: 'Pendiente de confirmación',
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
                    },
                    error:(err) => {
                      Swal.fire({
                        title: '¡No se pudo actualizar el producto!',
                        icon: 'error'
                      })
                    },
                  })      
                },
                error:(err) => {
                  Swal.fire({
                    title: '¡No se pudo generar la solicitud!',
                    icon: 'error'
                  })
                },
              })
            },
            error:(err) => {
              Swal.fire({
                title: '¡No se pudo generar el pedido!',
                icon: 'error'
              })
            },
          })
        )
      }
    })
  }
}
