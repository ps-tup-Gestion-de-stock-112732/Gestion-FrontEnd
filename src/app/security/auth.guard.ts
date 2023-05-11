import { Injectable } from '@angular/core';
import { CanLoad, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private srv: AuthService,
    private router: Router){}

  canLoad() {
    let logueado = this.srv.isLoggedIn()
    if (logueado) {
      return true;
    }

    this.router.navigate(['/pages-login'])
    return false
  }
}
