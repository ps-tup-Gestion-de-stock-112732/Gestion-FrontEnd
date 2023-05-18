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
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit ,OnDestroy {

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  public formularioAlta: FormGroup

  proveedor: Usuario = {} as Usuario

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        codigo: ["", Validators.required],
        nombreProducto: ["", Validators.required],
        descripcion: ["", Validators.required],
        precioUnitario: ["", Validators.required],
        cantidad: ["", Validators.required],
        idProveedor: [""]
      }
    )
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(proveedor) => {
          this.proveedor = proveedor
        },
      })
    )

  }

  guardar(){
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      try {
        this.guardarProducto()
      } catch (error) {
        console.log(error);
      }

    }
  }

  
  guardarProducto() {

    let producto: Producto = {
      'codigo': this.formularioAlta.value.codigo,
      'nombreProducto': this.formularioAlta.value.nombreProducto,
      'descripcion': this.formularioAlta.value.descripcion,
      'precioUnitario': this.formularioAlta.value.precioUnitario,
      'cantidad': this.formularioAlta.value.cantidad,
      'idProveedor': this.proveedor.idempresa
    }

    Swal.fire({
      title: '¿Desea registrar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {

        this.srvProducto.registrarProducto(producto).subscribe({
          next: (productoResponse) => {

            Swal.fire({
              title: 'Empresa creada con éxito',
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
          error: (err) => {
            Swal.fire({
              title: '¡No se pudo crear el producto!',
              icon: 'error'
            })
          }
        })
      }
    })
  }

  cancelar(){
    this.router.navigate(['pages/producto/lista'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}

