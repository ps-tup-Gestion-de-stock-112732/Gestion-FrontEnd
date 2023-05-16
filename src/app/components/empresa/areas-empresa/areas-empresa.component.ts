import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/interfaces/area';
import { Empresa } from 'src/app/interfaces/empresa';
import { AreaService } from 'src/app/services/area.service';
import { EmpresaService } from 'src/app/services/empresa.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-areas-empresa',
  templateUrl: './areas-empresa.component.html',
  styleUrls: ['./areas-empresa.component.css']
})
export class AreasEmpresaComponent implements OnInit, OnDestroy {

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

  agregar(){

    let area = {} as Area
    area.nombre = this.formularioAlta.value.nombre
    area.idempresa = this.empresa.idempresa

    this.srvAreas.agregarArea(area).subscribe({
      next:(areaResponse) => {
        this.actualizarLista(areaResponse.idempresa);
        this.formularioAlta.setValue({
          nombre: ''
        })
      },
      error:(err) => {
        this.mostrarMsjError(err.error.message)
      }
    })

  }

  eliminar(idarea: number){

    this.subs.add(
      this.srvEmpleado.empleadoXEmpresaXArea(idarea, this.empresa.idempresa).subscribe({
        next:(value) => {

          if (value) {
            this.mostrarMsjError('Existen empleados asociados a esta área.')
          }else{
            this.mostrarMsjError('')
            this.srvAreas.eliminarArea(idarea).subscribe({
              next:(area) => {
                console.log(area);
                this.actualizarLista(area.areaBorrada[0].idempresa);
              },
              error:(err) => {
                this.mostrarMsjError(err.error.message)
              }
            })
          }
          
        },
        error:(err) => {
          this.mostrarMsjError(err.error.message)
        }
      })
    )
  }

  cancelar(){
    this.router.navigate(['/pages/empresa/main'])
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  mostrarMsjError(error: String) {
    this.mensajeError = error;
  }

}
