import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Direccion, ResumeDireccion } from '../interfaces/direccion';
import { VariableBinding } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DireccionService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerDireccion(iddireccion: Number): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/'+ iddireccion)
  }

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

  obtenerBarriosAll(): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/barrios/all')
  }

  obtenerBarriosXNombre(nombre: string): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones/barrios/nombre', {
      "nombre": nombre
    })
  }

  guardarDireccionEmpleado(direccion: ResumeDireccion): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones', {
      "calle": direccion.calle,
      "altura": direccion.altura,
      "idbarrio": direccion.idbarrio
    })
  }

  guardarDireccionEmpresa(direccion: ResumeDireccion): Observable<any> {
    return this.http.post<any>(this.url + 'direcciones', {
      "calle": direccion.calle,
      "altura": direccion.altura,
      "idbarrio": direccion.idbarrio
    })
  }

  actualizarDireccionEmpresa(direccion: ResumeDireccion): Observable<any> {
    return this.http.patch<any>(this.url + 'direcciones/' + direccion.iddireccion, {
      "calle": direccion.calle,
      "altura": direccion.altura,
      "idbarrio": direccion.idbarrio
    })
  }

  actualizarDireccionEmpleado(direccion: ResumeDireccion): Observable<any> {
    return this.http.patch<any>(this.url + 'direcciones/' + direccion.iddireccion, {
      "calle": direccion.calle,
      "altura": direccion.altura,
      "idbarrio": direccion.idbarrio
    })
  }

  obtenerPais(idpais: Number): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/paises/'+ idpais)
  }

  obtenerProvincia(idprovincia: Number): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/provincias/' + idprovincia)
  }

  obtenerLocalidad(idlocalidad: Number): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/localidades/' + idlocalidad)
  }

  obtenerBarrio(idbarrio: Number): Observable<any> {
    return this.http.get<any>(this.url + 'direcciones/barrios/' + idbarrio)
  }
}
