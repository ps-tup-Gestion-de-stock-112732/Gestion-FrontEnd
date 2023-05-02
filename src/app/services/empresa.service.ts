import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerEmpresas(tipoempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'empresas/all', {
      "tipoempresa": tipoempresa
    })
  }
}
