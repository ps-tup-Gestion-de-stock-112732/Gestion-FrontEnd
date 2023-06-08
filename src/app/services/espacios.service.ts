import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerOficina(idoficina: number): Observable<any> {
    return this.http.get<any>(this.url + 'oficinas/' + idoficina)
  }

  obtenerOficinas(idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'oficinas/all', {
      'idempresa': idempresa
    })
  }

  crearOficina(idempresa: number, nombre: string, filas: number, columnas: number): Observable<any> {
    return this.http.post<any>(this.url + 'oficinas/', {
      'idempresa': idempresa,
      'nombreoficina': nombre,
      'cantidadfilas': filas,
      'cantidadcolumnas': columnas,
    })
  }

  actualizarOficina(idoficina: number, idempresa: number, nombre: string, filas: number, columnas: number): Observable<any> {
    return this.http.put<any>(this.url + 'oficinas/actualizar/'+idoficina, {
      'idempresa': idempresa,
      'nombreoficina': nombre,
      'cantidadfilas': filas,
      'cantidadcolumnas': columnas,
    })
  }

  eliminarOficina(idoficina: number): Observable<any> {
    return this.http.put<any>(this.url + 'oficinas/eliminar/'+idoficina, {})
  }

  obtenerEspaciosReservados(idoficina: number, fecha: Date): Observable<any> {
    return this.http.post<any>(this.url + 'oficinas/espacios/' + idoficina, {
      'fecha': fecha
    })
  }

  obtenerEspaciosReservadosXEmpleado(idempleado: number): Observable<any> {
    return this.http.get<any>(this.url + 'oficinas/espacios/empleado/' + idempleado)
  }

  reservarEspacio(idoficina: number, idempleado: number, fila: number, columna: number, fecha: Date): Observable<any> {
    return this.http.post<any>(this.url + 'oficinas/espacio/reserva', {
      'idoficina': idoficina,
      'idempleado': idempleado,
      'fila': fila,
      'columna': columna,
      'fecha': fecha,
    })
  }

  cancelarReserva(idespacio: number): Observable<any> {
    return this.http.put<any>(this.url + 'oficinas/espacio/cancelar/' + idespacio, {})
  }

}
