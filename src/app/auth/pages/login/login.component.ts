import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{

  formularioLogin : FormGroup;

  mensajeError: String = "";

  private suscripcion = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private srv: AuthService,) {

      this.formularioLogin = this.fb.group({

        email: [, Validators.required], 
        password: [, Validators.required]
  
      })

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.suscripcion.unsubscribe();
  }

  onLogin() {

    if (this.formularioLogin.invalid) {
      this.mostrarMsjError('Formulario Invalido');
    } else {
      const login = this.formularioLogin.value;

      this.suscripcion.add(
        this.srv.autenticar(login.email, login.password).subscribe({
          next: (data:any) => {
            this.srv.loginUser(data); // guarda el usuario y token en el localStorage

            setTimeout(()=>{
              this.router.navigate(['pages/dashboard']);
            },100);
            
          },
          error: (err) => {
            this.mostrarMsjError(err.error.message);
          }
        })
      )
    }
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
    setTimeout(() => {
      this.mensajeError = '';
    }, 2000);
  }
  

}

  

