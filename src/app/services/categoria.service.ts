import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerCategorias(idempresa: number): Observable<any> {
    return this.http.get<any>(this.url + 'categorias/all/'+ idempresa)
  }

  obtenerCategoria(idcategoria: number): Observable<any> {
    return this.http.get<any>(this.url + 'categorias/'+ idcategoria)
  }

  agregarCategoria(categoria: Categoria): Observable<any> {
    return this.http.post<any>(this.url + 'categorias/', {
      'descripcion': categoria.descripcion,
      'idProveedor': categoria.idempresa
    })
  }

  eliminarCategoria(idcategoria: number): Observable<any> {
    return this.http.put<any>(this.url + 'categorias/delete/' + idcategoria, {})
  }

  productoXEmpresaXCategoria(idcategoria: number, idempresa: number): Observable<any> {
    return this.http.post<any>(this.url + 'categorias/usada' , {
      'idcategoria': idcategoria,
      'idempresa': idempresa
    })
  }

}
