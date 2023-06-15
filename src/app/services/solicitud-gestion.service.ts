import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SolicitudGestionService {

  url: String = environment.baseUrl+'api/';
  
  constructor(private http: HttpClient) { }

  generarSolicitud(idpedido: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/',{
      'idpedido': idpedido
    })
  }

  obtenerSolicitud(idautorizacion: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitud-gestion/'+ idautorizacion)
  }

  obtenerSolicitudes(idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/all', {
      'idempresa': idempresa
    })
  }

  obtenerSolicitudesXProveedor(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/proveedor/all', {
      'idProveedor': idproveedor
    })
  }

  obtenerSolicitudesXEmpleado(idempleado: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitud-gestion/empleado/'+idempleado)
  }

  

  obtenerSolicitudesfiltro(nombre: string, idestado: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/filtro', {
      'nombre': nombre,
      'estado': idestado,
      'idempresa': idempresa
    })
  }


  obtenerSolicitudesfiltroXProveedor(nombre: string, idestado: number, idempresa: number, fecha: Date, idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/proveedor/filtro', {
      'nombre': nombre,
      'estado': idestado,
      'idempresa': idempresa,
      'fecha': fecha,
      'idProveedor': idproveedor
    })
  }


  obtenerEmpresas(idproveedor: number): Observable<any> {
    return this.http.get<any>(this.url + 'solicitud-gestion/proveedor/empresas/'+idproveedor)
  }


  obtenerSolicitudesfiltroEstado(idestado: number, idempresa: number, idempleado: number): Observable<any> {
    return this.http.post<any>(this.url + 'solicitud-gestion/filtro/estado', {
      'estado': idestado,
      'idempresa': idempresa,
      'idempleado': idempleado
    })
  }

  aprobarSolicitud(idsolicitud: number, idautorizante: number, comentarios: string): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/aprobar/'+ idsolicitud, {
      'idautorizante': idautorizante,
      'comentarios': comentarios
    })
  }

  rechazarSolicitud(idsolicitud: number, idautorizante: number, comentarios: string): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/rechazar/'+ idsolicitud, {
      'idautorizante': idautorizante,
      'comentarios': comentarios
    })
  }

  aprobarSolicitudVentas(idsolicitud: number, idautorizante: number, idoperacion: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/ventas/aprobar/'+ idsolicitud, {
      'idautorizante': idautorizante,
      'idoperacion': idoperacion
    })
  }

  cancelarSolicitud(idsolicitud: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/cancelar/'+ idsolicitud, {})
  }


  enviarPedido(idsolicitud: number, idautorizante: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/pedido/enviar/'+ idsolicitud, {
      'idautorizante': idautorizante
    })
  }

  rechazarPedido(idsolicitud: number, idautorizante: number, comentarios: string): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/pedido/rechazar/'+ idsolicitud, {
      'idautorizante': idautorizante,
      'comentarios': comentarios
    })
  }

  entregarPedido(idsolicitud: number, idautorizante: number): Observable<any> {
    return this.http.put<any>(this.url + 'solicitud-gestion/pedido/entregar/'+ idsolicitud, {
      'idautorizante': idautorizante
    })
  }
}
