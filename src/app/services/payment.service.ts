import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  url: String = environment.baseUrlPayment;

  constructor(private http: HttpClient) { }

  crearOrden(idautorizacion: number, nombreProducto: string, precioUnitario: number, cantidad: number): Observable<any> {
    return this.http.post<any>(this.url + 'create-order', {
      'idautorizacion': idautorizacion,
      'nombreProducto': nombreProducto,
      'precioUnitario': precioUnitario,
      'cantidad': cantidad
    })
  }
}
