import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UserToken } from '../interfaces/userToken';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable()
export class AuthService {

  user: UserToken
  
  url: string = environment.baseUrl+'api/auth/';

  constructor(private http: HttpClient) {
  }

  autenticar(email: String, password: String): Observable<any> {
    return this.http.post<any>(this.url + 'login', {
      "email": email,
      "password": password
    })
  }

  public loginUser(data: any){
    localStorage.setItem('token', data.token);
    this.user = {
      idusuario: data.result[0].idusuario,
      nombre: data.result[0].nombre,
      apellido: data.result[0].apellido,
      idrol: data.result[0].idrol
    }
    localStorage.setItem('user',JSON.stringify(this.user));
  }

  public isLoggedIn(): Boolean{
    return !!localStorage.getItem('token')
  }

  public logout(): void{
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getToken(): string|null{
    return localStorage.getItem('token');
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout;
    }
  }

}
