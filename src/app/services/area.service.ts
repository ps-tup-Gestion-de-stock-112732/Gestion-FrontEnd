import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Area } from '../interfaces/area';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerAreas(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'areas/all/'+ idempresa)
  }

  obtenerArea(idarea: number): Observable<any> {
    return this.http.get<any>(this.url + 'areas/' + idarea)
  }

  obtenerAreaXNombre(nombre: string, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'areas/nombre', {
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  agregarArea(area: Area): Observable<any> {
    return this.http.post<any>(this.url + 'areas/', area)
  }

  eliminarArea(idarea: number): Observable<any> {
    return this.http.put<any>(this.url + 'areas/delete/' + idarea, {})
  }
}
