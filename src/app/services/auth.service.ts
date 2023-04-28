import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { ResponseApi } from '../interfaces/response-api';
import { Usuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment';

const httpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = environment.baseUrl+'api/auth/login';

  private usuarioSubject: BehaviorSubject<Usuario>;

  constructor(private _http: HttpClient) {}

  login(login: Login): Observable<ResponseApi> {
    return this._http.post<ResponseApi>(this.url, login, httpOption).pipe(
      map((res) => {
        if (res) {
          const usuario: Usuario = res.value.usuario;
          localStorage.setItem('usuario', JSON.stringify(usuario));
          this.usuarioSubject.next(usuario);
        }
        return res;
      })
    );
  }

  logout() {
    localStorage.removeItem('usuario');
    this.usuarioSubject.next(null!);
  }
}
