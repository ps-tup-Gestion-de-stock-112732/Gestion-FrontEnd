import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChartData, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import { Oficina } from 'src/app/interfaces/oficina';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ReportesService } from 'src/app/services/reportes.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-espacios-gestion',
  templateUrl: './espacios-gestion.component.html',
  styleUrls: ['./espacios-gestion.component.css']
})
export class EspaciosGestionComponent implements OnInit, OnDestroy {

  bandera: boolean = false

  subscription: Subscription = new Subscription();

  formulario : FormGroup;

  usuario: Usuario = {} as Usuario

  years: any[] = []
  months: any[] = []

  anioActual: string = '0'
  mesActual: string = '0'

  oficinas: string[] = []
  data: number[] = []

  constructor(
    private fb: FormBuilder,
    private srv: AuthService,
    private srvUsuario: UsuarioService,
    private srvReporte: ReportesService
  ) { 
    this.formulario = this.fb.group({
      month: [""],
      year: [""]
    })
  }

  ngOnInit(): void {
    let usr = this.srv.getUser()
    this.subscription.add(
      this.srvUsuario.obtenerUsuario(usr.idusuario).subscribe({
        next: (usuario) => {
          this.usuario = usuario

          this.srvReporte.obtenerAniosReservas(this.usuario.idempresa).subscribe({
            next:(years) => {
              this.years = years
              
              this.srvReporte.obtenerMesesReservas(this.usuario.idempresa).subscribe({
                next:async (months) => {
                  this.months = months

                  await this.obtenerAnioyMesActual() 
                  this.formulario.patchValue({'year': this.anioActual, 'month': this.mesActual})

                  this.obtenerReservas(this.formulario.value.month, this.formulario.value.year)

                  this.formulario.controls['year'].valueChanges.subscribe({
                    next:async (year) => {
                      this.formulario.controls['month'].valueChanges.subscribe({
                        next:async (month) => {
                          this.obtenerReservas(month, year)
                        },
                      })
                    },
                  })
                },
              })
            },
          })
        },
        error:(err) => {
          this.years = []
          this.months = []
        }
      })
    ) 
  }

  obtenerAnioyMesActual() {
    let date_ob = new Date();
    // current month
    let mes = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    // current year
    let year = date_ob.getFullYear();

    let month = Number(mes)

    this.mesActual = month.toString()
    this.anioActual = year.toString()
  }

  diasEnUnMes(month: string, year: string) {
    return new Date(Number(year), Number(month), 0).getDate();
  }

  obtenerReservas(month: string, year: string){
    this.data = []

    this.subscription.add(
      this.srvReporte.obtenerOficinas(this.usuario.idempresa, month, year).subscribe({
        next:async (oficinas: Oficina[]) => {

          let totaloficinas = oficinas.length
          await oficinas.forEach((oficina, index) => {

            this.srvReporte.obtenerReservas(oficina.idoficina, month, year).subscribe({
              next:(reservas) => {
                let cantidadReservas = 0
                if (reservas != null) {
                  cantidadReservas = reservas.cantidad
                  this.oficinas.push(oficina.nombreoficina)
                  this.data.push(Math.round(cantidadReservas))
                }

                if (index + 1 == totaloficinas) {
                  this.bandera = true
                }
              },
            })

          });

          this.datos = {
            labels: this.oficinas,
            datasets: [
              {data: this.data}
            ]
          }
        },
      })
    )
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
        text: 'Espacios de oficinas reservados',
        font: { size: 26 }
      }
    }
  }

}
