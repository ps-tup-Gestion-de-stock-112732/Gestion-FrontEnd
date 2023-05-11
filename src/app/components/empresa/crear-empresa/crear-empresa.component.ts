import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Empresa } from 'src/app/interfaces/empresa';
import { Rol } from 'src/app/interfaces/rol';
import { EmpresaService } from 'src/app/services/empresa.service';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.css']
})
export class CrearEmpresaComponent implements OnInit {

  roles: Rol[]

  private suscripcion = new Subscription();

  mensajeErrores: String[]
  mensajeError: String = ""

  public formularioAlta: FormGroup

  empresa: Empresa

  @Output() cambioMostrar = new EventEmitter<boolean>()
  @Input() mostrar: boolean
  

  constructor(
    private router: Router,
    private srvEmpresa: EmpresaService
  ) { }

  ngOnInit(): void {
  }

  mostarForm(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
  }

  guardar(){

  }

  cancelar(){
    (this.mostrar) ? this.mostrar = false : this.mostrar = true
    this.cambioMostrar.emit( this.mostrar )
  }

}
