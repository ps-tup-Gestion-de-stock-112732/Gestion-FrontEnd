import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResumeAuthEmpresa } from '../interfaces/authEmpresa';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  registrarSolicitud(solicitud: ResumeAuthEmpresa): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/empresa', solicitud)
  }

  registrarSolicitudUsuarioEmpresa(idusuario: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/usuario/empresa', {
      'idusuario': idusuario,
      'idempresa': idempresa
    })
  }

  registrarSolicitudUsuarioProveedor(idusuario: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/usuario/proveedor', {
      'idusuario': idusuario,
      'idProveedor': idempresa
    })
  }

  obtenerSolicitudesPendientes(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/'+ idempresa)
  }

  obtenerSolicitudesPendientesProv(idempresaProveedor: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/proveedores/'+ idempresaProveedor)
  }






  obtenerSolicitudesPendientesXEmpresa(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/usr/empresa/'+ idempresa)
  }

  obtenerSolicitudesPendientesXProveedor(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/usr/proveedor/'+ idempresa)
  }

  solicitudPendientesUsuarioEmpresa(idusuario: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/empresa/usuario/'+ idusuario)
  }

  solicitudPendientesUsuarioProveedor(idusuario: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitudes/pendientes/proveedor/usuario/'+ idusuario)
  }

  obtenerProveedoresXSolicitud(nombre: string, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/nombre',{
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  obtenerUsuariosXSolicitud(nombre: string, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/usr/nombre',{
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  obtenerUsuariosProvXSolicitud(nombre: string, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitudes/usr/prov/nombre',{
      'nombre': nombre,
      'idProveedor': idempresa
    })
  }

  cancelarSolicitudPendientes(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/cancelar/'+ idsolicitud, {})
  }


  cancelarSolicitudPendientesUsuarioEmpresa(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/cancelar/usuario/empresa/'+ idsolicitud, {})
  }

  cancelarSolicitudPendientesUsuarioProveedor(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/cancelar/usuario/proveedor/'+ idsolicitud, {})
  }


  aprobarSolicitudPendientes(idsolicitud: number, idautorizante: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/aprobar/'+ idsolicitud, {
      'idautorizante': idautorizante
    })
  }

  aprobarSolicitudPendientesUsuarioEmpresa(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/aprobar/usr/empresa/'+ idsolicitud, {})
  }

  aprobarSolicitudPendientesUsuarioProveedor(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/aprobar/usr/proveedor/'+ idsolicitud, {})
  }

  rechazarSolicitudPendientes(idsolicitud: number, idautorizante: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/rechazar/'+ idsolicitud, {
      'idautorizante': idautorizante
    })
  }

  rechazarSolicitudPendientesUsuarioEmpresa(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/rechazar/usr/empresa/'+ idsolicitud, {})
  }

  rechazarSolicitudPendientesUsuarioProveedor(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitudes/rechazar/usr/proveedor/'+ idsolicitud, {})
  }
  
}
