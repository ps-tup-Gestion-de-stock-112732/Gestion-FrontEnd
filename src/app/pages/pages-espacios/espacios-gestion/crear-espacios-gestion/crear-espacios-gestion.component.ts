import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EspaciosService } from 'src/app/services/espacios.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-espacios-gestion',
  templateUrl: './crear-espacios-gestion.component.html',
  styleUrls: ['./crear-espacios-gestion.component.css']
})
export class CrearEspaciosGestionComponent implements OnInit, OnDestroy {

  formularioAlta : FormGroup;

  mensajeErrores: String[]
  mensajeError: String = ""

  private subs = new Subscription()

  usuario: Usuario = {} as Usuario

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEspacios: EspaciosService
  ) { 
    this.formularioAlta = this.fb.group({
      nombre: ["", Validators.required],
      filas: ["", Validators.required],
      columnas: ["", Validators.required]
    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario
        }
      })
    )
  }

  guardar(){
    if (this.formularioAlta.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {

      let nombre = this.formularioAlta.value.nombre
      let filas = this.formularioAlta.value.filas
      let columnas = this.formularioAlta.value.columnas

      try {

        Swal.fire({
          title: '¿Desea registrar esta nueva oficina?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#000',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {

          if (result.isConfirmed) {
            this.srvEspacios.crearOficina(this.usuario.idempresa, nombre, filas, columnas).subscribe({
              next:(oficina) => {
                
                Swal.fire({
                  title: 'Oficina creada con éxito',
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
                this.mostrarMsjErrores(err.error.errors);
              }
            })
          }
        })
        
      } catch (error) {
        console.log(error);
      }

    }
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
