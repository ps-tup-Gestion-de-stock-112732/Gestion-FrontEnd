import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  url: String = environment.baseUrl+'api/';

  constructor(private http: HttpClient) { }

  obtenerAreas(): Observable<any> {
    return this.http.get<any>(this.url + 'areas')
  }
}
