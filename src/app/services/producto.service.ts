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
    return this.http.post<any>(this.url + 'productos/all',{
      'idempresa': idProveedor
    })
  }

  obtenerProducto(codigo: number): Observable<any> {
    return this.http.get<any>(this.url + 'productos/' + codigo)
  }

  obtenerProductosXNombre(nombreProducto: string, idProveedor: number): Observable<any> {
    return this.http.post<any>(this.url + 'productos/nombre',{
      'nombreProducto': nombreProducto,
      'idempresa': idProveedor
    })
  }

  registrarProducto(producto: Producto): Observable<any> {
    return this.http.post<any>(this.url + 'productos/', producto)
  }

  bajaProducto(codigo: Number): Observable<any> {
    return this.http.put<any>(this.url + 'productos/delete/' + codigo, {})
  }

  actualizarProducto(producto: Producto): Observable<any> {
    return this.http.patch<any>(this.url + 'productos/'+ producto.codigo, {
      'idProveedor': producto.idProveedor,
      'nombreProducto': producto.nombreProducto,
      'descripcion': producto.descripcion,
      'precioUnitario': producto.precioUnitario,
      'cantidad': producto.cantidad
    })
  }
}
