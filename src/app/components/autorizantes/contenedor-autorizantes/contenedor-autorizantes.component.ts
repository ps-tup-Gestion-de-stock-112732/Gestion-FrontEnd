import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-contenedor-autorizantes',
  templateUrl: './contenedor-autorizantes.component.html',
  styleUrls: ['./contenedor-autorizantes.component.css']
})
export class ContenedorAutorizantesComponent implements OnInit, OnDestroy {

  private suscripcion = new Subscription()

  usuario: Usuario

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService
  ) { }
  

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          if (this.usuario.idempresa) {
            this.router.navigate(['pages/autorizantes/lista'])
          }else{
            this.router.navigate(['pages/autorizantes/redirect'])
          }
        },
      })
    )

    
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

}
