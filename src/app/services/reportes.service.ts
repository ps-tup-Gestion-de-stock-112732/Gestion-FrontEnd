import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  /*REPORTES PROVEEDOR*/

  obtenerAniosProveedor(idproveedor: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/proveedores/years/'+ idproveedor)
  }

  obtenerEmpresasProveedor(idproveedor: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/proveedores/empresas/'+ idproveedor)
  }

  obtenerIngresosxEmpresa(idproveedor: number, year: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/ingresos/empresas', {
      "idproveedor": idproveedor,
      "year": year,
      "idempresa": idempresa
    })
  }

  obtenerIngresosProveedor(idproveedor: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/ingresos', {
      "idproveedor": idproveedor,
      "year": year
    })
  }

  obtenerIngresosTotalesXDia(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/ingresosTotales/dia', {
      "idproveedor": idproveedor
    })
  }

  obtenerIngresosTotalesXMes(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/ingresosTotales/mes', {
      "idproveedor": idproveedor
    })
  }

  obtenerIngresosTotalesXAnio(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/ingresosTotales/anio', {
      "idproveedor": idproveedor
    })
  }


  obtenerProductosTotalesXDia(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/productosTotales/dia', {
      "idproveedor": idproveedor
    })
  }

  obtenerProductosTotalesXMes(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/productosTotales/mes', {
      "idproveedor": idproveedor
    })
  }

  obtenerProductosTotalesXAnio(idproveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/proveedores/productosTotales/anio', {
      "idproveedor": idproveedor
    })
  }

  obtenerProductosConBajoStock(idproveedor: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/proveedores/productosBajoStock/'+ idproveedor)
  }



  /*REPORTES GESTION*/

  obtenerAniosEmpresa(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/empresa/years/'+ idempresa)
  }

  obtenerGastosEmpresa(idempresa: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/empresa/gastos', {
      "idempresa": idempresa,
      "year": year
    })
  }

  obtenerGastosTotalesXDia(idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/gastosTotales/dia', {
      "idempresa": idempresa
    })
  }

  obtenerGastosTotalesXMes(idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/gastosTotales/mes', {
      "idempresa": idempresa
    })
  }

  obtenerGastosTotalesXAnio(idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/gastosTotales/anio', {
      "idempresa": idempresa
    })
  }

  obtenerEmpleadosRegistrados(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/gestion/empleadosTotales/'+idempresa)
  }




  obtenerAniosReservas(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/gestion/oficinas/years/'+ idempresa)
  }

  obtenerMesesReservas(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/gestion/oficinas/months/'+ idempresa)
  }

  obtenerOficinas(idempresa: number, month: string, year: string): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/oficinas/'+idempresa,{
      "month": month,
      "year": year,
    })
  }

  obtenerReservas(idoficina: number, month: string, year: string): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/reservas/'+idoficina,{
      "month": month,
      "year": year,
    })
  }





  obtenerAniosSolicitudes(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'reportes/gestion/solicitudes/years/'+ idempresa)
  }

  obtenerSolicitudesTotales(idempresa: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/solicitudes/total/'+ idempresa, {
      'year': year
    })
  }

  obtenerSolicitudesPendientes(idestado: number, idempresa: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/solicitudes/pendientes/'+ idestado, {
      'idempresa': idempresa,
      'year': year
    })
  }

  obtenerSolicitudesAprobadas(idrol: number, idempresa: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/solicitudes/aprobadas/'+ idrol, {
      'idempresa': idempresa,
      'year': year
    })
  }

  obtenerSolicitudesRechazadas(idrol: number, idempresa: number, year: number): Observable<any> {
    return this.http.post<any>(this.url + 'reportes/gestion/solicitudes/rechazadas/'+ idrol, {
      'idempresa': idempresa,
      'year': year
    })
  }
}
