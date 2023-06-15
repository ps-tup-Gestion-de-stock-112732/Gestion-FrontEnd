import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportesService } from 'src/app/services/reportes.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { InfoEmpresa } from 'src/app/interfaces/empresa';
import { DataSetProveedor } from 'src/app/interfaces/dataSetProveedor';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit, OnDestroy{

  subscription: Subscription = new Subscription();

  formulario : FormGroup;

  years: any[] = []
  ingresos: any[] = []
  empresas: any[] = []

  usuario: Usuario = {} as Usuario

  anioActual: number = 0

  listaEmpresas: InfoEmpresa[] = []
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

          this.srvReporte.obtenerAniosProveedor(this.usuario.idempresa).subscribe({
            next: (years) =>{
              this.years = years

              this.obtenerAnioActual() 
              this.formulario.patchValue({'year': this.anioActual})

              this.obtenerIngresos(this.formulario.value.year)

              this.formulario.controls['year'].valueChanges.subscribe({
                next:async (year) => {
                  this.obtenerIngresos(year)
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

  obtenerIngresos(year: number){

    this.listaEmpresas = []
    this.datasets = []

    this.srvReporte.obtenerIngresosProveedor(this.usuario.idempresa, year).subscribe({
      next:(ingresos: any[]) =>{

        let empresaAnterior = 0
        for (let i = 0; i < ingresos.length; i++) {
          if (ingresos[i].idempresa != empresaAnterior) {
            let empresa: InfoEmpresa = {} as InfoEmpresa
            empresa.idempresa = ingresos[i].idempresa
            empresa.empresa = ingresos[i].empresa
            this.listaEmpresas.push(empresa)
          }
        }

        this.listaEmpresas.forEach(empresa => {

          let label = empresa.empresa
          let data: any[] = []
          let tension = 0.4
          let dataset: DataSetProveedor = {} as DataSetProveedor

          let ingresosXEmpresa = ingresos.filter( ingreso => ingreso.idempresa == empresa.idempresa)

          for (let i = 0; i < 12; i++) {
            for (let j = 0; j < ingresosXEmpresa.length; j++) {
              if (ingresosXEmpresa[j].mes == i) {
                data.push(ingresosXEmpresa[j].ingreso)
              }
            }
            if (ingresosXEmpresa[i] == undefined) {
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

    /* this.srvReporte.obtenerEmpresasProveedor(this.usuario.idempresa).subscribe({
      next:(empresas: InfoEmpresa[]) =>{
        listaEmpresas = empresas

        listaEmpresas.forEach( async (empresa: InfoEmpresa) => {
          await this.srvReporte.obtenerIngresosxEmpresa(this.usuario.idempresa, year, empresa.idempresa).subscribe({
            next:( ingresos ) => {

              let label = empresa.empresa
              let data: any[] = []
              let tension = 0.4
              let dataset: DataSetProveedor = {} as DataSetProveedor

              for (let i = 0; i < 12; i++) {
                for (let j = 0; j < ingresos.length; j++) {
                  if (ingresos[j].mes == i) {
                    data.push(ingresos[j].ingreso)
                  }
                }
                if (ingresos[i] == undefined) {
                  data.push(0)
                }
              }

              dataset.label = label
              dataset.data = data
              dataset.tension = tension

              datasets.push(dataset)
              
            },
          })

        })
    
        this.datos = {
          labels: meses,
          datasets: datasets
        }
        
      }
    }) */
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
        text: 'Ingresos por empresa',
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
          text: 'Ingresos ($)'
        },
        suggestedMin: 0,
        suggestedMax: 200
      }
    }
  }

}
