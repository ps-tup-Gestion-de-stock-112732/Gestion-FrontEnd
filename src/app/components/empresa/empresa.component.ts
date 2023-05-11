import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit, OnDestroy {

  private subs = new Subscription()

  idusuario: number

  mostrar: boolean = false

  usuario: Usuario = {} as Usuario
  empresa: Empresa = {} as Empresa

  constructor(
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.idusuario = usr.idusuario

    this.subs.add(
      this.srvUsuario.obtenerUsuario(this.idusuario).subscribe({
        next: (usr: Usuario) => {
          this.usuario = usr
          this.empresa.idempresa = this.usuario.idempresa

          if (this.empresa.idempresa) {
            this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
              next: (empr)=>{
                this.empresa = empr
                this.router.navigate(['/pages/empresa/modificar'])
              }
            })
          }else{
            this.router.navigate(['/pages/empresa/lista'])
          }

        },
        error: (err) => {
          console.log(err);
        }
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

}
