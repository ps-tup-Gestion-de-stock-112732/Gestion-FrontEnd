import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar-producto',
  templateUrl: './modificar-producto.component.html',
  styleUrls: ['./modificar-producto.component.css']
})
export class ModificarProductoComponent implements OnInit, OnDestroy {

  usuario: Usuario = {} as Usuario
  
  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  proveedor: Empresa

  producto: Producto

  codigo: number

  public formularioModificacion: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private srvProducto: ProductoService
  ) { 
    this.formularioModificacion = this.fb.group(
      {
        codigo: [""],
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

    this.codigo = this.activatedRoute.snapshot.params['id']

    this.suscripcion.add(
      this.srvProducto.obtenerProducto(this.codigo).subscribe({
        next:(producto) => {
          this.producto = producto

          this.formularioModificacion.patchValue(this.producto)
        },
      })
    )
  }

  actualizar(){
    if (this.formularioModificacion.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      Swal.fire({
        title: '¿Desea modificar los datos de este producto?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {

          this.actualizarProducto()
          
        }
      })
    }
  }

  actualizarProducto(){

    let producto: Producto = {
      'codigo': this.codigo,
      'idProveedor': this.producto.idProveedor,
      'nombreProducto': this.formularioModificacion.value.nombreProducto,
      'descripcion': this.producto.descripcion,
      'precioUnitario': this.producto.precioUnitario,
      'cantidad': this.producto.cantidad
    }

    this.srvProducto.actualizarProducto(producto).subscribe({
      next: (productoResponse) => {

        if (productoResponse) {
          Swal.fire({
            title: 'Producto actualizado con éxito',
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
        }
      },
      error: (err) => {
        Swal.fire({
          title: '¡No se pudo realizar la operación!',
          icon: 'error'
        })
      }
    })
  }

  eliminarProducto(){

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
          this.srvProducto.bajaProducto(this.codigo).subscribe({
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
                title: '¡No se pudo dar de baja el producto!',
                icon: 'error'
              })
            }
          })
        )
      }
    })
  }

  cancelar(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
