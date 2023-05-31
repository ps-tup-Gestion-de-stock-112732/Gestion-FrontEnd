import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerEstado(idestado: number): Observable<any> {
    return this.http.get<any>(this.url + 'estados/' + idestado)
  }

  obtenerEstadoGestion(idestado: number): Observable<any> {
    return this.http.get<any>(this.url + 'estados/gestion/' + idestado)
  }

  obtenerEstadosGestion(): Observable<any> {
    return this.http.get<any>(this.url + 'estados/gestion/it/all')
  }
}
