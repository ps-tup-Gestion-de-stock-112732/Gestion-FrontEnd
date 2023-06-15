import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-banners-gestion',
  templateUrl: './banners-gestion.component.html',
  styleUrls: ['./banners-gestion.component.css']
})
export class BannersGestionComponent implements OnInit, OnDestroy {

  stringGastos: string = "Este mes"

  gastosTotales: number = 0
  empleadosTotales: number = 0

  subscription: Subscription = new Subscription();

  @Input() usuario: Usuario = {} as Usuario

  constructor(
    private srvReporte: ReportesService
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  ngOnInit(): void {

    this.subscription.add(
      this.srvReporte.obtenerGastosTotalesXMes(this.usuario.idempresa).subscribe({
        next:(gastos) => {
          if (gastos.gastos == null) {
            this.gastosTotales = 0
          }else{
            this.gastosTotales = gastos.gastos
          }

          this.srvReporte.obtenerEmpleadosRegistrados(this.usuario.idempresa).subscribe({
            next:(empleados) => {
              
              this.empleadosTotales = empleados.cantidad
              
            },
          })
        },
      })
    )

  }

  ingresos(filtro: number){
    switch (filtro) {
      case 1: {
        this.stringGastos = "Hoy"
        this.subscription.add(
          this.srvReporte.obtenerGastosTotalesXDia(this.usuario.idempresa).subscribe({
            next:(gastos) => {
              if (gastos.gastos == null) {
                this.gastosTotales = 0
              }else{
                this.gastosTotales = gastos.gastos
              }
            },
          })
        )
        break;
      }
      case 2: {
        this.stringGastos = "Este mes"
        this.subscription.add(
          this.srvReporte.obtenerGastosTotalesXMes(this.usuario.idempresa).subscribe({
              next:(gastos) => {
                if (gastos.gastos == null) {
                  this.gastosTotales = 0
                }else{
                  this.gastosTotales = gastos.gastos
                }
            },
          })
        )
        break;
      } 
      case 3: {
        this.stringGastos = "Este año"
        this.subscription.add(
          this.srvReporte.obtenerGastosTotalesXAnio(this.usuario.idempresa).subscribe({
            next:(gastos) => {
              if (gastos.gastos == null) {
                this.gastosTotales = 0
              }else{
                this.gastosTotales = gastos.gastos
              }
            },
          })
        )
        break;
      } 
    }
  }

}

