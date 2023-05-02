import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  registrarEmpleado(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url + 'empleados', {
      "nombre": usuario.nombre,
      "apellido": usuario.apellido,
      "idempresa": usuario.idempresa,
      "nro_documento": usuario.nro_documento,
      "email": usuario.email,
      "password": usuario.password,
      "telefono": usuario.telefono,
      "idarea": usuario.idarea,
      "iddireccion": usuario.iddireccion,
    })
  }

  registrarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url + 'usuarios', {
      "nombre": usuario.nombre,
      "apellido": usuario.apellido,
      "idempresa": usuario.idempresa,
      "nro_documento": usuario.nro_documento,
      "email": usuario.email,
      "password": usuario.password,
      "telefono": usuario.telefono,
      "idrol": usuario.idrol
    })
  }
}
