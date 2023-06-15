import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-solicitudes-gestion',
  templateUrl: './solicitudes-gestion.component.html',
  styleUrls: ['./solicitudes-gestion.component.css']
})
export class SolicitudesGestionComponent implements OnInit, OnDestroy {

  bandera: boolean = false

  subscription: Subscription = new Subscription();

  formulario : FormGroup;

  usuario: Usuario = {} as Usuario

  years: any[] = []

  anioActual: number = 0

  data: number[] = []
  labels: string[] = []

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

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.subscription.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (usuario) => {
          this.usuario = usuario

          this,this.srvReporte.obtenerAniosSolicitudes(this.usuario.idempresa).subscribe({
            next:async (years) =>{
              this.years = years

              await this.obtenerAnioActual()
              this.formulario.patchValue({'year': this.anioActual})
              this.obtenerSolicitudesGestion(this.formulario.value.year)

              this.formulario.controls['year'].valueChanges.subscribe({
                next:async (year) => {
                  this.obtenerSolicitudesGestion(year)
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


  obtenerSolicitudesGestion(year: number){

    this.data = []
    this.labels = []
    let idestado = 0
        if (this.usuario.idrol == 2) {
          idestado = 1
        }else{
          idestado = 2
        }

    this.srvReporte.obtenerSolicitudesTotales(this.usuario.idempresa, year).subscribe({
      next:(totales) => {

        this.srvReporte.obtenerSolicitudesPendientes(idestado, this.usuario.idempresa, year).subscribe({
          next:(pendientes) => {
            
            this.srvReporte.obtenerSolicitudesAprobadas(this.usuario.idrol, this.usuario.idempresa, year).subscribe({
              next:(aprobadas) =>{ 
                
                this.srvReporte.obtenerSolicitudesRechazadas(this.usuario.idrol, this.usuario.idempresa, year).subscribe({
                  next:(rechazadas) =>{

                    if (pendientes.pendientes != 0) {
                      let porcPendientes = Math.round(pendientes.pendientes * 100 / totales.total)
                      this.labels.push('Pendientes')
                      this.data.push(porcPendientes)
                    }

                    if (aprobadas.aprobadas != 0) {
                      let porcAprobadas = Math.round(aprobadas.aprobadas * 100 / totales.total)
                      this.labels.push('Aprobadas')
                      this.data.push(porcAprobadas)
                    }

                    if (rechazadas.rechazadas != 0) {
                      let porcRechazadas = Math.round(rechazadas.rechazadas * 100 / totales.total)
                      this.labels.push('Rechazadas')
                      this.data.push(porcRechazadas)
                    }
                    
                    this.datos = {
                      labels: this.labels,
                      datasets: [
                        {data: this.data}
                      ]
                    }

                    this.bandera = true
                  },
                })
              },
            })
          },
        })
      },
    })

    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  datos: ChartData<'doughnut'> = {
    labels: [],
    datasets: [
      { data: [] }
    ]
  }

  opciones: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estadísticas solicitudes por año',
        font: { size: 26 }
      }
    }
  }

}
