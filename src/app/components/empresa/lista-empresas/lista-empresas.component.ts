import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit, OnDestroy {

  p: number = 1;

  @Output() cambioMostrar = new EventEmitter<boolean>()
  @Input() usuario: Usuario = {} as Usuario

  mostrar: boolean = false

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  empresas: Empresa[]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srvEmpresa: EmpresaService,
    private srvDireccion: DireccionService,
    private srvUsuario: UsuarioService
  ) { 
    this.formularioBusqueda = this.fb.group({
      busqueda: ["", Validators.required]
    })
  }

  ngOnInit(): void {

    if(this.usuario.idrol != 5){
      this.obtenerEmpresasAll()
    }

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerEmpresasAll(){
    this.suscripcion.add(
      this.srvEmpresa.obtenerEmpresas(1).subscribe({
        next: (empresas)=>{

          this.obtenerDireccion(empresas)
          

        }
      })
    )
  }

  obtenerDireccion(empresas: Empresa[]){

    this.empresas = empresas

    for (let i = 0; i < this.empresas.length; i++) {

      let dire: Direccion = {} as Direccion

      this.srvDireccion.obtenerDireccion(this.empresas[i].iddireccion).subscribe({
        next: (direccion) => {
          dire = direccion
          
          this.srvDireccion.obtenerBarrio(dire.idbarrio).subscribe({
            next:(barrio) =>{
              dire.barrio = barrio
  
              this.srvDireccion.obtenerLocalidad(dire.barrio.idlocalidad).subscribe({
                next:(localidad) =>{
                  dire.localidad = localidad
  
                  this.srvDireccion.obtenerProvincia(dire.localidad.idprovincia).subscribe({
                    next:(provincia) =>{
                      dire.provincia = provincia
  
                      this.srvDireccion.obtenerPais(dire.provincia.idprovincia).subscribe({
                        next:(pais) =>{
                          dire.pais = pais
  
                          this.empresas[i].direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
                          ', '+dire.localidad.nombre+', '+dire.provincia.nombre+', '+dire.pais.nombre
  
                        },
                      })
                    },
                  })
                },
              })
            },
          })
        },
      })
    }
  }

  mostarForm(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerEmpresasAll()
    } else {
      this.suscripcion.add(
        this.srvEmpresa.obtenerEmpresasXNombre(this.formularioBusqueda.value.busqueda, 1).subscribe({
          next:(empresas) =>{
            this.empresas = empresas

            this.obtenerDireccion(this.empresas)
          },
        })
      )
    }
  }

  selectEmpresa(idempresa: number){
    
    Swal.fire({
      title: '¿Desea asociar esta empresa a su cuenta?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuario.idempresa = idempresa

        this.suscripcion.add(
          this.srvUsuario.updateUsuarioEmpresa(this.usuario).subscribe({
            next:(usr) => {

              if (usr) {
                Swal.fire({
                  title: 'Cuenta actualizada con éxito',
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
            },error: (err) => {
              Swal.fire({
                title: '¡No se pudo actualizar la empresa!',
                icon: 'error'
              })
            }
          })
        )
      }
    })
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
