import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerRoles(): Observable<any> {
    return this.http.get<any>(this.url + 'roles')
  }

  obtenerRol(idrol: Number): Observable<any> {
    return this.http.post<any>(this.url + 'roles/'+ idrol, {})
  }
}
