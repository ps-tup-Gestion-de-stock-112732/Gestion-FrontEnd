import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit, OnDestroy {

  p: number = 1;
  
  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  usuario: Usuario
  productos: Producto[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService
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

          this.obtenerProductosAll()
        }
      })
    )
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerProductosAll()
    } else {
      this.suscripcion.add(
        this.srvProducto.obtenerProductosXNombre(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          next:(productos) =>{
            this.productos = productos
          },
          error: (err) => {
            this.productos = []
          }
        })
      )
    }
  }

  obtenerProductosAll(){

    this.suscripcion.add(
      this.srvProducto.obtenerProductos(this.usuario.idempresa).subscribe({
        next: (productos)=>{

          this.productos = productos

        },
        error: (err) => {
          this.productos = []
        }
      })
    )
  }

  elimarProducto(idempleado: number){

    Swal.fire({
      title: '¿Desea dar de baja este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.suscripcion.add(
          this.srvUsuario.bajaEmpleado(idempleado).subscribe({
            next:(value) => {

              Swal.fire({
                title: 'Producto eliminado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#007bff'
              }).then((result) => {

                let currentUrl = this.router.url;
                this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigate([currentUrl]);
                });
              })
            },
            error: (err) => {
              Swal.fire({
                title: '¡No se pudo dar de baja el producto.!',
                icon: 'error'
              })
            }
          })
        )
      }
    })
  }

  mostarForm(){
    this.router.navigate(['/pages/producto/crear'])
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}