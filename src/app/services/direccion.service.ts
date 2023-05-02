import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Direccion } from '../interfaces/direccion';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerPaises(): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/paises')
  }

  obtenerProvincias(pais: Number): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones/provincias', {
      "idpais": pais
    })
  }

  obtenerLocalidades(provincia: Number): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones/localidades', {
      "idprovincia": provincia
    })
  }

  obtenerBarrios(localidad: Number): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones/barrios', {
      "idlocalidad": localidad
    })
  }

  guardarDireccion(direccion: Direccion): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones', {
      "calle": direccion.calle,
      "altura": direccion.altura,
      "idbarrio": direccion.idbarrio
    })
  }
}
