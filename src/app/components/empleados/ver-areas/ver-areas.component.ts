import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Empresa } from 'src/app/interfaces/empresa';
import { AreaService } from 'src/app/services/area.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-areas',
  templateUrl: './ver-areas.component.html',
  styleUrls: ['./ver-areas.component.css']
})
export class VerAreasComponent implements OnInit, OnDestroy {

  p: number = 1;

  private subs = new Subscription()

  areas: Area[]

  empresa: Empresa

  mensajeError: String = ""

  public formularioAlta: FormGroup

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public fb: FormBuilder,
    private srvAreas: AreaService,
    private srvEmpresa: EmpresaService,
    private srvEmpleado: UsuarioService
  ) { 
    this.formularioAlta = this.fb.group(
      {
        nombre: ["", Validators.required],
      }
    )
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']

    this.subs.add(

      this.srvEmpresa.obtenerEmpresa(id).subscribe({
        next:(empresa) => {
          this.empresa = empresa

          this.actualizarLista(id)
          
        },
      })
    )
  }

  actualizarLista(id: number){

    this.subs.add(
      this.srvAreas.obtenerAreas(id).subscribe({
        next:(areas) => {
          this.areas = areas
        },
      })
    )
  }

  buscar(){

    let nombre = this.formularioAlta.value.nombre
    let idempresa = this.empresa.idempresa

    if (nombre == '') {
      this.actualizarLista(idempresa)
    }else{
      this.srvAreas.obtenerAreaXNombre(nombre, idempresa).subscribe({
        next:(areaResponse) => {
          this.areas = areaResponse
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

