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
}
