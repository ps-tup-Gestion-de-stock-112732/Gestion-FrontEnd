import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Barrio } from 'src/app/interfaces/barrio';
import { Empresa } from 'src/app/interfaces/empresa';
import { AreaService } from 'src/app/services/area.service';
import { DireccionService } from 'src/app/services/direccion.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-barrios',
  templateUrl: './ver-barrios.component.html',
  styleUrls: ['./ver-barrios.component.css']
})
export class VerBarriosComponent implements OnInit, OnDestroy {

  p: number = 1;

  private subs = new Subscription()

  barrios: Barrio[]

  empresa: Empresa

  mensajeError: String = ""

  public formularioAlta: FormGroup

  constructor(
    private router: Router,
    public fb: FormBuilder,
    private srvBarrio: DireccionService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
      }
    )
  }

  ngOnInit(): void {

    this.actualizarLista()
  }

  actualizarLista(){

    this.subs.add(
      this.srvBarrio.obtenerBarriosAll().subscribe({
        next:(barrios) => {
          this.barrios = barrios
        },
      })
    )
  }

  buscar(){

    let nombre = this.formularioAlta.value.nombre

    if (nombre == '') {
      this.actualizarLista()
    }else{
      this.srvBarrio.obtenerBarriosXNombre(nombre).subscribe({
        next:(barriosResponse) => {
          this.barrios = barriosResponse
          this.formularioAlta.setValue({
            nombre: ''
          })
        },
        error:(err) => {
          this.mostrarMsjError(err.error.message)
        }
      })
    }
  }

  cancelar(){
    this.router.navigate(['/pages/empleados/masiva'])
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}


