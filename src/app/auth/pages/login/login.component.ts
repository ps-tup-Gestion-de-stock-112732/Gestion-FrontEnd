import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formulario : FormGroup;

  private subscription = new Subscription();

  login: Login

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    
    this.formulario = this.formBuilder.group({

      email: [, Validators.required], 
      password: [, Validators.required]

    })

  }

  onLogin() {

    this.login.email = this.formulario.value.email
    this.login.password = this.formulario.value.password

    if (this.formulario.valid) {
      this.subscription.add(
        this.authService.login(this.login).subscribe({
          next: () => {
            this.irAListado();
          },
          error: () => {
            alert('error al iniciar sesion');
          },
        })
      );
    }
  }

  cancelar() {
    this.irAListado();
  }

  private irAListado() {
    this.router.navigate(['']);
  }

}

  

