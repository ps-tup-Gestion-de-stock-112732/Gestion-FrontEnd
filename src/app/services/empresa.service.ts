import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empresa, ResumeEmpresa } from '../interfaces/empresa';

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

  obtenerEmpresa(id: Number): Observable<any> {
    return this.http.get<any>(this.url + 'empresas/' + id)
  }

  obtenerEmpresasXNombre(nombre: string, tipoempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'empresas/nombre',{
      'nombre': nombre,
      'tipoempresa': tipoempresa
    })
  }

  registrarEmpresa(empresa: ResumeEmpresa): Observable<any> {
    return this.http.post<any>(this.url + 'empresas/', empresa)
  }

  actualizarEmpresa(empresa: ResumeEmpresa): Observable<any> {
    return this.http.patch<any>(this.url + 'empresas/' + empresa.idempresa, empresa)
  }

  bajaEmpresa(idempresa: Number): Observable<any> {
    return this.http.put<any>(this.url + 'empresas/delete/' + idempresa, {})
  }

  obtenerProveedores(tipoempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'proveedores/all', {
      "tipoempresa": tipoempresa
    })
  }

  obtenerProveedoresXNombre(nombre: string, tipoempresa: Number): Observable<any> {
    return this.http.post<any>(this.url + 'proveedores/nombre',{
      'nombre': nombre,
      'tipoempresa': tipoempresa
    })
  }

  registrarProveedor(proveedor: ResumeEmpresa): Observable<any> {
    return this.http.post<any>(this.url + 'proveedores/', proveedor)
  }

}
