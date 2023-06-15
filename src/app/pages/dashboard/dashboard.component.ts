import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  subscription: Subscription = new Subscription();
  usuario: Usuario = {} as Usuario

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService) { }

  ngOnInit(): void {

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "../assets/js/main.js";
    this.elementRef.nativeElement.appendChild(s);

    let usr = this.srv.getUser()
    this.subscription.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (usuario) => {
          this.usuario = usuario

          if (this.usuario.idrol == 4) {
            this.router.navigate(['/pages/dashboard/reportes/proveedor'])
          }else if(this.usuario.idrol == 2 || this.usuario.idrol == 3){
            this.router.navigate(['/pages/dashboard/reportes/gestion'])
          }else if(this.usuario.idrol == 1 || this.usuario.idrol == 5){
            this.router.navigate(['/pages/dashboard/reportes/welcome'])
          }

        }
      })
    ) 

    
  }

}
