import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { Empresa } from 'src/app/interfaces/empresa';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
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

  file: any = {}

  imagenAnterior: string = ""

  categorias: Categoria[] = []

  public formularioModificacion: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService,
    private srvCategoria: CategoriaService
  ) { 
    this.formularioModificacion = this.fb.group(
      {
        codigo: [""],
        nombreProducto: ["", Validators.required],
        descripcion: ["", Validators.required],
        precioUnitario: ["", Validators.required],
        cantidad: ["", Validators.required],
        idcategoria: ["", Validators.required],
        img: [""],
        idProveedor: [""]
      }
    )
  }
  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    this.codigo = this.activatedRoute.snapshot.params['id']

    let usr = this.srv.getUser()
    this.suscripcion.add(

      this.srvProducto.obtenerProducto(this.codigo).subscribe({
        next:(producto) => {
          this.producto = producto
          this.imagenAnterior = this.producto.imagen

          this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
            next:(proveedor) => {
              this.proveedor = proveedor
    
              this.obtenerCategorias()

            },
          })
        },
      })
    )
  }

  obtenerCategorias(){

    this.srvCategoria.obtenerCategorias(this.proveedor.idempresa).subscribe({
      next:(categorias) => {
        this.categorias = categorias

        this.formularioModificacion.patchValue(this.producto)

      },
    })

  }

  obtenerArchivo(event: any): void{
    let archivo = event.target.files
    let reader = new FileReader()
    
    reader.readAsDataURL(archivo[0])
    reader.onloadend = () => {
      this.file = reader.result
    }
  }

  actualizar(){
    if (this.formularioModificacion.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      this.actualizarImagen()
    }
  }

  actualizarImagen(){

    let producto: Producto = {} as Producto

    producto.codigo = this.formularioModificacion.value.codigo;
    producto.nombreProducto = this.formularioModificacion.value.nombreProducto;
    producto.descripcion = this.formularioModificacion.value.descripcion;
    producto.precioUnitario = this.formularioModificacion.value.precioUnitario;
    producto.cantidad = this.formularioModificacion.value.cantidad;
    producto.idcategoria = this.formularioModificacion.value.idcategoria;

    (this.formularioModificacion.value.img != "")? producto.imagen = this.formularioModificacion.value.img : producto.imagen = this.imagenAnterior;
    
    producto.idProveedor = this.proveedor.idempresa;

    Swal.fire({
      title: '¿Desea actualizar este producto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise(()=>{

          if (this.imagenAnterior != producto.imagen) {

            let nombre = 'producto' + '_' + Date.now()
            this.srvProducto.subirImagen(nombre, this.file)
            .then(urlImagen => {
            
              if (urlImagen != null) {
                producto.imagen = urlImagen

                this.actualizarProducto(producto)
              }
              throw new Error()
            })
            .catch(error => {
              Swal.fire({
                title: '¡No se pudo actualizar el producto!',
                icon: 'error'
              })
            })
          }else{
            this.actualizarProducto(producto)
          }
        })
      },
    })
  }

  actualizarProducto(producto: Producto){
    
    this.srvProducto.actualizarProducto(producto).subscribe({
      next: (productoResponse) => {

        Swal.fire({
          title: 'Producto actualizado con éxito',
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
          title: '¡No se pudo actualizar el producto!',
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
