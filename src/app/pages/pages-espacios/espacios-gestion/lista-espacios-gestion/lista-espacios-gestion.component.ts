import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Oficina } from 'src/app/interfaces/oficina';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ContratoService } from 'src/app/services/contrato.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { EspaciosService } from 'src/app/services/espacios.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-lista-espacios-gestion',
  templateUrl: './lista-espacios-gestion.component.html',
  styleUrls: ['./lista-espacios-gestion.component.css']
})
export class ListaEspaciosGestionComponent implements OnInit, OnDestroy {

  @Output() modificarOficina = new EventEmitter<number>()

  p: number = 1;

  private subs = new Subscription()

  usuario: Usuario = {} as Usuario
  oficinas: Oficina[] = []

  constructor(
    private router: Router,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvEspacios: EspaciosService,
    private srvEmpresa: EmpresaService
  ) { 
    
  }
  
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.subs.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next:(usuario) => {
          this.usuario = usuario

          this.srvEspacios.obtenerOficinas(this.usuario.idempresa).subscribe({
            next:async (oficinas) => {
              this.oficinas = oficinas

              await this.obtenerEmpresas()
            },
          })
        }
      })
    )
  }

  obtenerEmpresas(){

    this.oficinas.forEach(ofi => {
      this.srvEmpresa.obtenerEmpresa(ofi.idempresa).subscribe({
        next:(empresa) => {
          ofi.empresa = empresa
        },
      })
    });
    
  }

  modificar(idoficina: number){
    this.modificarOficina.emit( idoficina )
  }

}
