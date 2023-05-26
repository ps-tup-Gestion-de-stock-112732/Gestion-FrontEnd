import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AreaService } from 'src/app/services/area.service';
import { AuthService } from 'src/app/services/auth.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista-autorizantes',
  templateUrl: './lista-autorizantes.component.html',
  styleUrls: ['./lista-autorizantes.component.css']
})
export class ListaAutorizantesComponent implements OnInit, OnDestroy {

  p: number = 1;
  
  formularioBusqueda : FormGroup;

  usuario: Usuario = {} as Usuario
  usuarios: Usuario[] = []

  mostrar: boolean = false

  private suscripcion = new Subscription();

  mensajeError: String = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvRol: RolService
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

          this.obtenerUsuariosAll()
        }
      })
    )
    
  }

  buscar(){
    if (this.formularioBusqueda.invalid) {
      this.obtenerUsuariosAll()
    } else {
      this.suscripcion.add(
        this.srvUsuario.obtenerAutorizantesXNombre(this.formularioBusqueda.value.busqueda, this.usuario.idempresa).subscribe({
          
          next:(autorizantes) =>{
            this.usuarios = autorizantes
            this.obtenerRol()
          },
          error: (err) => {
            this.usuarios = []
          }
        })
      )
    }
  }

  obtenerUsuariosAll(){

    this.suscripcion.add(
      this.srvUsuario.obtenerAutorizantes(this.usuario.idempresa).subscribe({
        next: (autorizantes)=>{

          this.usuarios = autorizantes
          this.obtenerRol()

        },
        error: (err) => {
          this.usuarios = []
        }
      })
    )
  }

  obtenerRol() {
    for (let i = 0; i < this.usuarios.length; i++) {
      this.srvRol.obtenerRol(this.usuarios[i].idrol).subscribe({
        next:(rol) => {
          this.usuarios[i].rol = rol.nombre
        },
      })
      
    }
  }

  elimarUsuario(idusuario: number){

    Swal.fire({
      title: '¿Desea dar de baja este autorizante?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#000',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (result.isConfirmed) {
        this.suscripcion.add(
          this.srvUsuario.bajaAutorizante(idusuario).subscribe({
            next:(value) => {

              Swal.fire({
                title: 'Usuario autorizante eliminado con éxito',
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
                title: '¡No se pudo dar de baja el usuario autorizante.!',
                icon: 'error'
              })
            }
          })
        )
      }
    })

    
  }

  mostarForm(){
    this.router.navigate(['/pages/autorizantes/crear'])
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

}

