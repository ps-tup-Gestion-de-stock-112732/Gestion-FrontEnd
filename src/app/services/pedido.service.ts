import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../interfaces/producto';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  url: String = environment.baseUrl+'api/';
  
  constructor(private http: HttpClient) { }

  generarPedido(empleado: Usuario, producto: Producto, cantidad: number): Observable<any> {
    return this.http.post<any>(this.url + 'pedidos/',{
      'idempleado': empleado.idusuario,
      'idempresa': empleado.idempresa,
      'idProveedor': producto.idProveedor,
      'codigo': producto.codigo,
      'cantidad': cantidad,
      'precioUnitario': producto.precioUnitario,
    })
  }
}
