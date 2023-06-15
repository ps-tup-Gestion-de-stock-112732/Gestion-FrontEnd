import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit, OnDestroy {

  stringIngresos: string = "Este mes"
  stringProductos: string = "Este mes"

  ingresosTotales: number = 0
  productosTotales: number = 0

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
      this.srvReporte.obtenerIngresosTotalesXMes(this.usuario.idempresa).subscribe({
        next:(ingresos) => {
          this.ingresosTotales = ingresos.ingresos

          this.srvReporte.obtenerProductosTotalesXMes(this.usuario.idempresa).subscribe({
            next:(cantidades) => {
              this.productosTotales = cantidades.productos
            },
          })
        },
      })
    )

  }

  ingresos(filtro: number){
    switch (filtro) {
      case 1: {
        this.stringIngresos = "Hoy"
        this.subscription.add(
          this.srvReporte.obtenerIngresosTotalesXDia(this.usuario.idempresa).subscribe({
            next:(ingresos) => {
              if (ingresos.ingresos == null) {
                this.ingresosTotales = 0
              }else{
                this.ingresosTotales = ingresos.ingresos
              }
            },
          })
        )
        break;
      }
      case 2: {
        this.stringIngresos = "Este mes"
        this.subscription.add(
          this.srvReporte.obtenerIngresosTotalesXMes(this.usuario.idempresa).subscribe({
              next:(ingresos) => {
                if (ingresos.ingresos == null) {
                  this.ingresosTotales = 0
                }else{
                  this.ingresosTotales = ingresos.ingresos
                }
            },
          })
        )
        break;
      } 
      case 3: {
        this.stringIngresos = "Este año"
        this.subscription.add(
          this.srvReporte.obtenerIngresosTotalesXAnio(this.usuario.idempresa).subscribe({
            next:(ingresos) => {
              if (ingresos.ingresos == null) {
                this.ingresosTotales = 0
              }else{
                this.ingresosTotales = ingresos.ingresos
              }
            },
          })
        )
        break;
      } 
    }
  }

  productos(filtro: number){
    switch (filtro) {
      case 1: {
        this.stringProductos = "Hoy"
        this.srvReporte.obtenerProductosTotalesXDia(this.usuario.idempresa).subscribe({
          next:(cantidades) => {
            if (cantidades.productos == null) {
              this.productosTotales = 0
            }else{
              this.productosTotales = cantidades.productos
            }
          },
        })
        break;
      } 
      case 2: {
        this.stringProductos = "Este mes"
        this.srvReporte.obtenerProductosTotalesXMes(this.usuario.idempresa).subscribe({
          next:(cantidades) => {
            if (cantidades.productos == null) {
              this.productosTotales = 0
            }else{
              this.productosTotales = cantidades.productos
            }
          },
        })
        break;
      } 
      case 3: {
        this.stringProductos = "Este año"
        this.srvReporte.obtenerProductosTotalesXAnio(this.usuario.idempresa).subscribe({
          next:(cantidades) => {
            if (cantidades.productos == null) {
              this.productosTotales = 0
            }else{
              this.productosTotales = cantidades.productos
            }
          },
        })
        break;
      } 
    }
  }


}
