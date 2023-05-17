import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Direccion } from 'src/app/interfaces/direccion';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-proveedor',
  templateUrl: './lista-proveedor.component.html',
  styleUrls: ['./lista-proveedor.component.css']
})
export class ListaProveedorComponent implements OnInit, OnDestroy {

  p: number = 1;

  formularioBusqueda : FormGroup;

  private suscripcion = new Subscription();

  mensajeError: String = "";

  proveedores: Empresa[]

  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvProveedor: EmpresaService,
    private srvDireccion: DireccionService,
    private srvUsuario: UsuarioService
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
        }
      })
    )

    this.obtenerProveedoresAll()

  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  obtenerProveedoresAll(){
    this.suscripcion.add(
      this.srvProveedor.obtenerProveedores(2).subscribe({
        next: (proveedores)=>{

          this.obtenerDireccion(proveedores)
          

        }
      })
    )
  }

  obtenerDireccion(proveedores: Empresa[]){

    this.proveedores = proveedores

    for (let i = 0; i < this.proveedores.length; i++) {

      let dire: Direccion = {} as Direccion

      this.srvDireccion.obtenerDireccion(this.proveedores[i].iddireccion).subscribe({
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
  
                          this.proveedores[i].direccion = dire.calle+' '+dire.altura+' '+dire.barrio.nombre+
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

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerProveedoresAll()
    } else {
      this.suscripcion.add(
        this.srvProveedor.obtenerProveedoresXNombre(this.formularioBusqueda.value.busqueda, 2).subscribe({
          next:(proveedores) =>{
            this.proveedores = proveedores

            this.obtenerDireccion(this.proveedores)
          },
        })
      )
    }
  }

  selectProveedor(idempresa: number){
    
    Swal.fire({
      title: '¿Desea asociar este proveedor a su cuenta?',
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

  mostarForm(){
    this.router.navigate(['/pages/proveedor/crear'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}


