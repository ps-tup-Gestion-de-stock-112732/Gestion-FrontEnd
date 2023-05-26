import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Categoria } from 'src/app/interfaces/categoria';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html',
  styleUrls: ['./lista-categorias.component.css']
})
export class ListaCategoriasComponent implements OnInit, OnDestroy {

  p: number = 1;

  private subs = new Subscription()

  categorias: Categoria[] = []

  empresa: Empresa = {} as Empresa

  usuario: Usuario = {} as Usuario

  mensajeError: String = ""

  public formularioAlta: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvEmpresa: EmpresaService,
    private srvUsuario: UsuarioService,
    private srvCategoria: CategoriaService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
      }
    )
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
            next:(empresa) => {
              this.empresa = empresa
    
              this.actualizarLista(this.empresa.idempresa)
              
            },
          })
        },
      })
    )
  }

  actualizarLista(id: number){

    this.subs.add(
      this.srvCategoria.obtenerCategorias(id).subscribe({
        next:(categorias) => {
          this.categorias = categorias
        },
      })
    )
  }

  agregar(){

    let categoria = {} as Categoria
    categoria.descripcion = this.formularioAlta.value.nombre
    categoria.idempresa = this.empresa.idempresa

    this.srvCategoria.agregarCategoria(categoria).subscribe({
      next:(categoriaResponse) => {
        this.actualizarLista(categoriaResponse.idempresa);
        this.formularioAlta.setValue({
          nombre: ''
        })
      },
      error:(err) => {
        this.mostrarMsjError(err.error.message)
      }
    })

  }

  eliminar(idcategoria: number){

    this.subs.add(
      this.srvCategoria.productoXEmpresaXCategoria(idcategoria, this.empresa.idempresa).subscribe({
        next:(value) => {

          if (value) {
            this.mostrarMsjError('Existen productos asociados a esta categoría.')
          }else{
            this.mostrarMsjError('')
            this.srvCategoria.eliminarCategoria(idcategoria).subscribe({
              next:(categoria) => {
                this.actualizarLista(categoria.categoriaBorrada[0].idempresa);
              },
              error:(err) => {
                this.mostrarMsjError(err.error.message)
              }
            })
          }
          
        },
        error:(err) => {
          this.mostrarMsjError(err.error.message)
        }
      })
    )
  }

  cancelar(){
    this.router.navigate(['/pages/producto/lista'])
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
