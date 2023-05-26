import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResumeContrato } from '../interfaces/contrato';

@Injectable({
  providedIn: 'root'
})
export class ContratoService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerContratos(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'contratos/all/'+ idempresa)
  }

  obtenerContratosProveedor(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'contratos/allxprov/'+ idempresa)
  }

  obtenerProveedoresXContrato(nombre: string, idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'contratos/nombre',{
      'nombre': nombre,
      'idempresa': idempresa
    })
  }

  obtenerEmpresasXContrato(nombre: string, idempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'contratos/nombre/empresa',{
      'nombre': nombre,
      'idProveedor': idempresa
    })
  }

  registrarContrato(contrato: ResumeContrato): Observable<any> {
    return this.http.post<any>(this.url + 'contratos/',{
      'idempresa': contrato.idempresa,
      'idProveedor': contrato.idempresaProveedor,
      'idautorizacion': contrato.idautorizacion,
    })
  }

  bajaContrato(id: number): Observable<any> {
    return this.http.put<any>(this.url + 'contratos/baja/'+ id, {})
  }

}
