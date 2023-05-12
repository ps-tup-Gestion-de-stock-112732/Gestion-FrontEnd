import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerUsuario(idusuario: Number): Observable<any> {
    return this.http.get<any>(this.url + 'usuarios/' + idusuario)
  }

  updateUsuarioEmpresa(usuario: Usuario): Observable<any> {
    return this.http.patch<any>(this.url + 'usuarios/' + usuario.idusuario, {
      idempresa: usuario.idempresa,
      esAdmin: usuario.esAdmin
    })
  }

  desvincularEmpresa(idusuario: Number): Observable<any> {
    return this.http.put<any>(this.url + 'usuarios/desvincular/' + idusuario, {})
  }
}
