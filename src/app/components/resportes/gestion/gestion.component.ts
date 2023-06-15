import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { DataSetEmpresa } from 'src/app/interfaces/dataSetEmpresa';
import { DataSetProveedor } from 'src/app/interfaces/dataSetProveedor';
import { InfoEmpresa } from 'src/app/interfaces/empresa';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit, OnDestroy{

  subscription: Subscription = new Subscription();

  formulario : FormGroup;

  years: any[] = []
  ingresos: any[] = []
  empresas: any[] = []

  usuario: Usuario = {} as Usuario

  anioActual: number = 0

  listaProveedores: InfoEmpresa[] = []
  meses: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  datasets: any[] = []

  constructor(
    private fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvReporte: ReportesService
  ) { 
    this.formulario = this.fb.group({
      year: [""]
    })
  }

  ngOnInit() {

    let usr = this.srv.getUser()
    this.subscription.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (usuario) => {
          this.usuario = usuario

          this.srvReporte.obtenerAniosEmpresa(this.usuario.idempresa).subscribe({
            next: (years) =>{
              this.years = years

              this.obtenerAnioActual() 
              this.formulario.patchValue({'year': this.anioActual})

              this.obtenerGastos(this.formulario.value.year)

              this.formulario.controls['year'].valueChanges.subscribe({
                next:async (year) => {
                  this.obtenerGastos(year)
                },
              })
            },
          })
        },
        error:(err) => {
          this.years = []
        }
      })
    ) 
  }

  obtenerAnioActual() {
    let date_ob = new Date();
    // current year
    let year = date_ob.getFullYear();

    this.anioActual = year
  }

  obtenerGastos(year: number){

    this.listaProveedores = []
    this.datasets = []

    this.srvReporte.obtenerGastosEmpresa(this.usuario.idempresa, year).subscribe({
      next:(gastos: any[]) =>{

        let proveedorAnterior = 0
        for (let i = 0; i < gastos.length; i++) {
          if (gastos[i].idproveedor != proveedorAnterior) {
            let empresa: InfoEmpresa = {} as InfoEmpresa
            empresa.idempresa = gastos[i].idproveedor
            empresa.empresa = gastos[i].proveedor
            this.listaProveedores.push(empresa)
          }
        }

        this.listaProveedores.forEach(proveedor => {

          let label = proveedor.empresa
          let data: any[] = []
          let tension = 0.4
          let dataset: DataSetEmpresa = {} as DataSetEmpresa

          let gastosXProveedor = gastos.filter( gasto => gasto.idproveedor == proveedor.idempresa)

          for (let i = 0; i < 12; i++) {
            for (let j = 0; j < gastosXProveedor.length; j++) {
              if (gastosXProveedor[j].mes == i) {
                data.push(gastosXProveedor[j].gasto)
              }
            }
            if (gastosXProveedor[i] == undefined) {
              data.push(0)
            }
          }

          dataset.label = label
          dataset.data = data
          dataset.tension = tension

          this.datasets.push(dataset)
        });

      },
    })

    this.datos = {
      labels: this.meses,
      datasets: this.datasets
    }

  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  datos: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [] },
      { data: [] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Gastos por proveedor',
        font: { size: 26 }
      }
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Meses'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Gastos ($)'
        },
        suggestedMin: 0,
        suggestedMax: 200
      }
    }
  }

}
