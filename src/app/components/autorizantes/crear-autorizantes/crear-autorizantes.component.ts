import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Rol } from 'src/app/interfaces/rol';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-autorizantes',
  templateUrl: './crear-autorizantes.component.html',
  styleUrls: ['./crear-autorizantes.component.css']
})
export class CrearAutorizantesComponent implements OnInit, OnDestroy{

  idrol: Number

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  public formularioAlta: FormGroup

  usuario: Usuario

  roles: Rol[]

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srv: AuthService,
    private srvAutorizante: UsuarioService,
    private srvRol: RolService) {
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        telefono: ["", Validators.required],
        idrol: ["", Validators.required]
      }
    )
  }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvAutorizante.obtenerUsuario(usr.idusuario).subscribe({
        next:async (usuario) => {
          this.usuario = usuario
        }
      })
    ) 

    this.suscripcion.add(this.srvRol.obtenerRoles().subscribe({
      next: (roles: Rol[]) =>{
        this.roles = roles.filter(r => r.idrol == 2 || r.idrol == 3 )
      },
      error: (err) => {
        this.mostrarMsjError(err.error.message);
      }
    }))
    
    this.suscripcion.add(
      this.formularioAlta.controls['idrol'].valueChanges.subscribe({
        next: (valor) =>{
          this.idrol = valor
          let tipoempresa: Number = 1
          if (this.idrol == 4) {
            tipoempresa = 2
          }
        }
      })
    )
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  guardar() {
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      this.guardarUsuario()
    }
  }

  guardarUsuario(){
    this.srvAutorizante.registrarAutorizante(this.formularioAlta.value, this.usuario.idempresa).subscribe({
      next: () => {
        Swal.fire({
          title: '¿Desea registrar este nuevo autorizante?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#000',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {

            Swal.fire({
              title: 'Usuario autorizante creado con éxito',
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
        })
      },
      error: (err) => {
        this.mostrarMsjErrores(err.error.errors);
      }
    })
  }

  cancelar(){
    this.router.navigate(['/pages/autorizantes/lista'])
  }

  mostrarMsjErrores(errores: any[]) {
    let mensajes : String[] = []

    for (let i = 0; i < errores.length; i++) {
      mensajes.push(errores[i].msg)
    }
    
    this.mensajeErrores = mensajes;
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }
}