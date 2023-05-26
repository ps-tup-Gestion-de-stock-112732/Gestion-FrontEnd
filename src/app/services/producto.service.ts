import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';

import firebase from "firebase/compat/app";
import 'firebase/compat/storage'

firebase.initializeApp(environment.firebaseConfig)

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  url: String = environment.baseUrl+'api/';

  storageRef= firebase.app().storage().ref()
  

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
      'cantidad': producto.cantidad,
      'idcategoria': producto.idcategoria,
      'imagen': producto.imagen
    })
  }

  actualizarCantidadProducto(codigo: number, cantidad: number): Observable<any> {
    return this.http.put<any>(this.url + 'productos/cantidad/'+ codigo, {
      'cantidad': cantidad
    })
  }

  async subirImagen(nombre: string, imgBase64: any){

    try {
      let respuesta = await this.storageRef.child("productos/"+nombre).putString(imgBase64, 'data_url')
      return await respuesta.ref.getDownloadURL()
    } catch (error) {
      console.log(error);
      return null
    }
  }
}
