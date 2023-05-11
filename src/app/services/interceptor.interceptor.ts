import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private srv: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.srv.getToken();
    
    if(token != null){
      authReq = authReq.clone({
        setHeaders: {Authorization:`${token}`}
      });
    }
    return next.handle(authReq)
  }

  manejarError(error: HttpErrorResponse) {
    console.log('Sucedio un error')
    console.warn(error)
    return throwError(()=>'Error personalizado')
  }
}

export const InterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorInterceptor,
    multi: true
  }
]


