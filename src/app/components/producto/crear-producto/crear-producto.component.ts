import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
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

  categorias: Categoria[] = []

  file: any = {}

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService,
    private srvCategoria: CategoriaService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        codigo: ["", Validators.required],
        nombreProducto: ["", Validators.required],
        descripcion: ["", Validators.required],
        precioUnitario: ["", Validators.required],
        cantidad: ["", Validators.required],
        categoria: ["", Validators.required],
        imagen: ["", Validators.required],
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

          this.obtenerCategorias();
        },
      })
    )

  }

  obtenerArchivo(event: any): void{
    let archivo = event.target.files
    let reader = new FileReader()
    
    reader.readAsDataURL(archivo[0])
    reader.onloadend = () => {
      this.file = reader.result
    }
  }

  obtenerCategorias() {

    this.suscripcion.add(
      this.srvCategoria.obtenerCategorias(this.proveedor.idempresa).subscribe({
        next:(categorias) => {
          this.categorias = categorias
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

    let producto: Producto = {} as Producto

    producto.codigo = this.formularioAlta.value.codigo,
    producto.nombreProducto = this.formularioAlta.value.nombreProducto,
    producto.descripcion = this.formularioAlta.value.descripcion,
    producto.precioUnitario = this.formularioAlta.value.precioUnitario,
    producto.cantidad = this.formularioAlta.value.cantidad,
    producto.idProveedor = this.proveedor.idempresa,
    producto.idcategoria = this.formularioAlta.value.categoria
    

    Swal.fire({
      title: '¿Desea registrar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise(()=>{

          let nombre = 'producto' + '_' + Date.now()
          this.srvProducto.subirImagen(nombre, this.file).then(urlImagen => {

            if (urlImagen != null) {
              producto.imagen = urlImagen

              this.srvProducto.registrarProducto(producto).subscribe({
                next: (productoResponse) => {
      
                  Swal.fire({
                    title: 'Producto creado con éxito',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: '#007bff'
                  }).then((result) => {
                    if (result.isConfirmed) {
      
                      this.router.navigate(['pages/producto/lista'])
          
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
            throw new Error()
          })
          .catch(error => {
            Swal.fire({
              title: '¡No se pudo crear el producto!',
              icon: 'error'
            })
          })

        })
      },
    })
  }

  cancelar(){
    this.router.navigate(['pages/producto/lista'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}

