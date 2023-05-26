import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Categoria } from 'src/app/interfaces/categoria';
import { Contrato } from 'src/app/interfaces/contrato';
import { Empresa } from 'src/app/interfaces/empresa';
import { Producto } from 'src/app/interfaces/producto';
import { ProveedorXCategoria } from 'src/app/interfaces/proveedorXCategoria';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crear-nuevo-pedido',
  templateUrl: './crear-nuevo-pedido.component.html',
  styleUrls: ['./crear-nuevo-pedido.component.css']
})
export class CrearNuevoPedidoComponent implements OnInit, OnDestroy {

  p: number = 1;

  private suscripcion = new Subscription();

  formularioBusqueda : FormGroup;

  mensajeError: String = "";

  usuario: Usuario

  productosAll: Producto[] = []
  productos: Producto[] = []
  contratos: Contrato[] = []

  categorias: Categoria[] = []
  proveedores: Empresa[] = []

  proveedorXCategoria: ProveedorXCategoria[] = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvProducto: ProductoService,
    private srvContrato: ContratoService,
    private srvProveedor: EmpresaService,
    private srvCategoria: CategoriaService
  ) { 
    this.formularioBusqueda = this.fb.group({
      nombre: [""],
      idempresa: [""],
      idcategoria: [""],
    })
  }


  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvContrato.obtenerContratos(this.usuario.idempresa).subscribe({
            next:async (contratos) => {

              this.contratos = contratos
              await this.obtenerProductos()
              await this.obtenerListas()
            },
          })
        }
      })
    )
  }

  obtenerProductos(){
    for (let i = 0; i < this.contratos.length; i++) {
      this.srvProducto.obtenerProductos(this.contratos[i].idempresaProveedor).subscribe({
        next:(productos) => {

          for (let j = 0; j < productos.length; j++) {
            
            this.srvProveedor.obtenerEmpresa(productos[j].idProveedor).subscribe({
              next:(proveedor) => {

                let contador = 0
                this.proveedores.forEach(element => {
                  if (element.idempresa == proveedor.idempresa) {
                    contador++
                  }
                });

                if (contador == 0) {
                  this.proveedores.push(proveedor)
                }
                
                productos[j].datosProveedor = proveedor

                this.srvCategoria.obtenerCategoria(productos[j].idcategoria).subscribe({
                  next:(categoria) => {

                    productos[j].categoria = categoria

                    this.productosAll.push(productos[j])
                    this.productos.push(productos[j])
                    
                  },
                })
              },
            })
          }
        },
      })
    }
  }

  obtenerListas(){

    this.formularioBusqueda.controls['idempresa'].valueChanges.subscribe({
      next:(idempresa) => {
        this.formularioBusqueda.patchValue({
          idcategoria: ""
        })
        this.srvCategoria.obtenerCategorias(idempresa).subscribe({
          next:(categorias) => {
            this.categorias = categorias
          },
        })
      },
    })
    
  }

  buscar(){

    console.log(this.formularioBusqueda.value);

    if (this.formularioBusqueda.value.nombre && this.formularioBusqueda.value.idempresa) {

      if (this.formularioBusqueda.value.idcategoria) {
        this.productos = this.productosAll.filter( producto =>{
          return producto.nombreProducto.toUpperCase().indexOf(this.formularioBusqueda.value.nombre.toUpperCase()) >= 0 &&
           producto.idProveedor == this.formularioBusqueda.value.idempresa && producto.idcategoria == this.formularioBusqueda.value.idcategoria
        })
      }else{
        this.productos = this.productosAll.filter( producto =>{
          return producto.nombreProducto.toUpperCase().indexOf(this.formularioBusqueda.value.nombre.toUpperCase()) >= 0 &&
           producto.idProveedor == this.formularioBusqueda.value.idempresa
        })
      }

    }else if(this.formularioBusqueda.value.nombre){

      this.productos = this.productosAll.filter( producto =>{
        return producto.nombreProducto.toUpperCase().indexOf(this.formularioBusqueda.value.nombre.toUpperCase()) >= 0
      })
      
    }else if(this.formularioBusqueda.value.idempresa){

      if (this.formularioBusqueda.value.idcategoria) {
        this.productos = this.productosAll.filter( producto =>{
          return producto.idProveedor == this.formularioBusqueda.value.idempresa && producto.idcategoria == this.formularioBusqueda.value.idcategoria
        })
      }else{
        this.productos = this.productosAll.filter( producto =>{
          return producto.idProveedor == this.formularioBusqueda.value.idempresa
        })
      }
      
    }else{
      this.productos = this.productosAll
    }

  }

  limpiar(){
    this.formularioBusqueda.setValue({
      nombre: "",
      idempresa: "",
      idcategoria: ""
    })

    this.productos = this.productosAll
  }

}
