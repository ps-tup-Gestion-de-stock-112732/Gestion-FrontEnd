import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PatchUsuario, ResumeUsuario, Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerUsuario(idusuario: Number): Observable<any> {
    return this.http.get<any>(this.url + 'usuarios/' + idusuario)
  }

  obtenerEmpleado(idempleado: Number): Observable<any> {
    return this.http.get<any>(this.url + 'empleados/' + idempleado)
  }

  obtenerAutorizante(idusuario: Number): Observable<any> {
    return this.http.get<any>(this.url + 'autorizantes/' + idusuario)
  }

  obtenerEmpleados(idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'empleados/all', {
      'idempresa': idempresa
    })
  }

  obtenerAutorizantes(idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'autorizantes/all', {
      'idempresa': idempresa
    })
  }

  obtenerEmpleadosXNombre(nombre: string, idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'empleados/nombre', {
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  obtenerAutorizantesXNombre(nombre: string, idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'autorizantes/nombre', {
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  updateUsuarioEmpresa(usuario: Usuario): Observable<any> {
    return this.http.patch<any>(this.url + 'usuarios/' + usuario.idusuario, {
      idempresa: usuario.idempresa
    })
  }

  updateUsuarioProveedor(usuario: Usuario): Observable<any> {
    return this.http.patch<any>(this.url + 'usuarios/' + usuario.idusuario, {
      idempresa: usuario.idempresa
    })
  }

  updateUsuario(usuario: ResumeUsuario): Observable<any> {
    return this.http.patch<any>(this.url + 'usuarios/' + usuario.idusuario, usuario)
  }

  updateEmpleado(usuario: ResumeUsuario): Observable<any> {
    return this.http.patch<any>(this.url + 'empleados/' + usuario.idusuario, usuario)
  }

  updateAutorizante(usuario: PatchUsuario): Observable<any> {
    return this.http.patch<any>(this.url + 'autorizantes/' + usuario.idusuario, usuario)
  }

  updateUsuarioPassword(idusuario: Number, pass: string): Observable<any> {
    return this.http.patch<any>(this.url + 'usuarios/' + idusuario, {
      'password': pass
    })
  }

  desvincularEmpresa(idusuario: Number): Observable<any> {
    return this.http.put<any>(this.url + 'usuarios/desvincular/' + idusuario, {})
  }

  empleadoXEmpresaXArea(idarea: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'empleados/empresaxarea' , {
      'idarea': idarea,
      'idempresa': idempresa
    })
  }

  bajaEmpleado(idusuario: Number): Observable<any> {
    return this.http.put<any>(this.url + 'empleados/delete/' + idusuario, {})
  }

  bajaAutorizante(idusuario: Number): Observable<any> {
    return this.http.put<any>(this.url + 'autorizantes/delete/' + idusuario, {})
  }

  sendFile(body: FormData): Observable<any> {
    return this.http.post<any>(this.url + 'empleados/upload', body)
  }

  desvincularProveedor(idusuario: Number): Observable<any> {
    return this.http.put<any>(this.url + 'proveedores/desvincular/' + idusuario, {})
  }

  registrarAutorizante(usuario: Usuario): Observable<any> {
    return this.http.post<any>(this.url + 'autorizantes', {
      "nombre": usuario.nombre,
      "apellido": usuario.apellido,
      "nro_documento": usuario.nro_documento,
      "email": usuario.email,
      "password": usuario.password,
      "telefono": usuario.telefono,
      "idrol": usuario.idrol
    })
  }
}
