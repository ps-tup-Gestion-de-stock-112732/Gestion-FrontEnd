import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerProductos(idProveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'producto/all',{
      'idProveedor': idProveedor
    })
  }

  obtenerProductosXNombre(nombreProducto: string, idProveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'producto/nombre',{
      'nombreProducto': nombreProducto,
      'idProveedor': idProveedor
    })
  }

  registrarProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.url + 'producto/', producto)
  }

  /* bajaProducto(codigo: Number): Observable<any> {
    return this.http.put<any>(this.url + 'producto/delete/' + codigo, {})
  } */
}
