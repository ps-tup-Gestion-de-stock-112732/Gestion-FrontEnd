import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-pages-login',
  templateUrl: './pages-login.component.html',
  styleUrls: ['./pages-login.component.css']
})
export class PagesLoginComponent implements OnInit, OnDestroy {

  formularioLogin : FormGroup;

  mensajeErrores: String[]
  mensajeError: String = "";

  private suscripcion = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private srv: AuthService) {

      this.formularioLogin = this.fb.group({

        email: ["", Validators.required], 
        password: ["", Validators.required]
  
      })

  }

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  onLogin() {

    this.mensajeError = ''
    this.mensajeErrores = []

    if (this.formularioLogin.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      const login = this.formularioLogin.value;

      this.suscripcion.add(
        this.srv.autenticar(login.email, login.password).subscribe({
          next: (data:any) => {
            this.srv.loginUser(data); // guarda el usuario y token en el localStorage
            
            this.router.navigate(['/pages/dashboard']);
            
          },
          error: (err) => {
            
            if(err.error.errors){
              this.mostrarMsjErrores(err.error.errors);
            }else{
              this.mostrarMsjError(err.error.message);
            }
          }
        })
      )
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
