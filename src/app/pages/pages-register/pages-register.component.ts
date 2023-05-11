import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { RegistroService } from '../../services/registro.service';
import { Subscription } from 'rxjs';
import Swal from "sweetalert2";
import { Usuario } from 'src/app/interfaces/usuario';
import { Rol } from 'src/app/interfaces/rol';
import { RolService } from 'src/app/services/rol.service';

@Component({
  selector: 'app-pages-register',
  templateUrl: './pages-register.component.html',
  styleUrls: ['./pages-register.component.css']
})
export class PagesRegisterComponent implements OnInit, OnDestroy{

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
    private srv: RegistroService,
    private srvRol: RolService) {
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
        apellido: ["", Validators.required],
        nro_documento: ["", Validators.required],
        email: ["", Validators.required],
        password: ["", Validators.required],
        telefono: ["", Validators.required],
        idrol: ["", Validators.required],
      }
    )
  }

  ngOnInit(): void {

    this.suscripcion.add(this.srvRol.obtenerRoles().subscribe({
      next: (roles: Rol[]) =>{
        this.roles = roles.filter(r => r.idrol != 5)
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
    this.srv.registrarUsuario(this.formularioAlta.value).subscribe({
      next: () => {
        Swal.fire({
          title: 'Usuario registrado con exito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#007bff'
        }).then((result) => {
          if (result.isConfirmed) {

            setTimeout(()=>{
              this.router.navigate(['/pages/dashboard']);
            },100);
            
          }
        })
      },
      error: (err) => {
        this.mostrarMsjErrores(err.error.errors);
      }
    })
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
    setTimeout(() => {
      this.mensajeError = '';
    }, 2000);
  }
}
