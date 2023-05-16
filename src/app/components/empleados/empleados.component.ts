import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit, OnDestroy {

  private subs = new Subscription()
  
  mostrar: boolean = false
  modificar: boolean = false
  
  usuario: Usuario = {} as Usuario
  empresa: Empresa = {} as Empresa
  
  constructor(
    private srv: AuthService,
    private router: Router,
    private srvUsuario: UsuarioService,
    private srvEmpresa: EmpresaService
  ) { }

  ngOnInit(): void {

    let usr = this.srv.getUser()

    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (u: Usuario) => {
          this.usuario = u
          if (this.usuario.idempresa) {
            this.srvEmpresa.obtenerEmpresa(this.usuario.idempresa).subscribe({
              next: (empr)=>{
                this.empresa = empr
              }
            })
          }else{
            this.router.navigate(['/pages/empleados/redirect'])
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
