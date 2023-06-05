import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { SolicitudGestionService } from 'src/app/services/solicitud-gestion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  private suscripcion = new Subscription();

  idautorizacion: number
  idoperacion: number
  usuario: Usuario = {} as Usuario

  constructor(
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private srvSolicitudGestion: SolicitudGestionService,
  ) { }

  ngOnInit(): void {

    this.idautorizacion = this.activatedRoute.snapshot.params['id']

    const urlParams = new URLSearchParams(window.location.search);
    const collection_id = urlParams.get('collection_id');

    let usr = this.srv.getUser()
    this.suscripcion.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario
          
          if (collection_id != null) {
            this.idoperacion = Number.parseInt(collection_id)
      
            this.srvSolicitudGestion.aprobarSolicitudVentas(this.idautorizacion, this.usuario.idusuario, this.idoperacion).subscribe()
          }
        }
      })
    ) 
  }
}
