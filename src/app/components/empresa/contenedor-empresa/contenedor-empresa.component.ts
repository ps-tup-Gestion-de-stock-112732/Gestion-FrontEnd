import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudService } from 'src/app/services/solicitud.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-contenedor-empresa',
  templateUrl: './contenedor-empresa.component.html',
  styleUrls: ['./contenedor-empresa.component.css']
})
export class ContenedorEmpresaComponent implements OnInit {

  private suscripcion = new Subscription();

  usuario: Usuario = {} as Usuario
  
  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvSolicitud: SolicitudService
  ) { }

  ngOnInit(): void {

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvSolicitud.solicitudPendientesUsuarioEmpresa(this.usuario.idusuario).subscribe({
            next:(value) => {

              if (value.length) {
                this.router.navigate(['/pages/empresa/en-espera'])
              }else{
                this.router.navigate(['/pages/empresa/main'])
              }
              
            },
          })

        }
      })
    )

    
  }

}
