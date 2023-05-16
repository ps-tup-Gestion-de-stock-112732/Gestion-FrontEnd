import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-masiva-empleados',
  templateUrl: './masiva-empleados.component.html',
  styleUrls: ['./masiva-empleados.component.css']
})
export class MasivaEmpleadosComponent implements OnInit, OnDestroy {

  private subs = new Subscription()

  mensajeErrores: String[]
  mensajeError: String = ""

  public formulario: FormGroup

  private fileTmp: any

  usuario: Usuario = {} as Usuario
  empresa: Empresa = {} as Empresa

  constructor(
    public fb: FormBuilder,
    private srvEmpleado: UsuarioService,
    private srv: AuthService,
    private router: Router,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService
  ) {
    this.formulario = this.fb.group(
      {
        archivo: ["", Validators.required]
      }
    )
   }

  ngOnInit(): void {
    let usr = this.srv.getUser()

    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (u: Usuario) => {
          this.usuario = u
          console.log(this.usuario);
          if (this.usuario.idempresa) {
            this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
              next: (empr)=>{
                this.empresa = empr
              }
            })
          }else{
            this.router.navigate(['/pages/empleados/redirect'])
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    )

    this.formulario.controls['archivo'].valueChanges.subscribe({
      next:(value) => {
        this.mostrarMsjError('')
      },
    })
  }

  obtenerArchivo(event: any): void{
    const [file] = event.target.files
    this.fileTmp = {
      fileRaw: file
    }
  }

  cargar(){

    if (this.formulario.invalid) {
      this.mostrarMsjError('Debe seleccionar un archivo');
    } else {

      const body = new FormData()
      body.append('idempresa', this.empresa.idempresa.toString())
      body.append('archivo', this.fileTmp.fileRaw)

      Swal.fire({
        title: '¿Desea registrar los empleados adjuntados?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#000',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        
        if (result) {
          this.subs.add(
            this.srvEmpleado.sendFile(body).subscribe({
              next:(res) => {

                Swal.fire({
                  title: 'Empleados creados con éxito',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#007bff'
                }).then((result) => {
                  console.log(res);
                })
                
              },
              error:(err) => {

                Swal.fire({
                  title: 'No se pudo cargar la solicitud',
                  text: 'Existen errores de datos en el archivo',
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#007bff'
                }).then((error) => {
                  console.log('Existen errores de datos en el archivo');
                })
                
              },
            })
          )
        }
      })
    }
  }

  cancelar(){
    this.router.navigate(['/pages/empleados/main'])
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
