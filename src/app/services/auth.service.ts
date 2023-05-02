import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.baseUrl+'api/auth/';

  constructor(private http: HttpClient) {}

  autenticar(email: String, password: String): Observable<any> {
    return this.http.post<any>(this.url + 'login', {
      "email": email,
      "password": password
    })
  }

  public loginUser(data: any){
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', data.result[0]);
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      return true;
    }
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  public getToken(){
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
