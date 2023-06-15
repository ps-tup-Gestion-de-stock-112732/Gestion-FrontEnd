import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Producto } from 'src/app/interfaces/producto';
import { Usuario } from 'src/app/interfaces/usuario';
import { ReportesService } from 'src/app/services/reportes.service';

@Component({
  selector: 'app-stock-bajo',
  templateUrl: './stock-bajo.component.html',
  styleUrls: ['./stock-bajo.component.css']
})
export class StockBajoComponent implements OnInit {

  @Input() usuario: Usuario = {} as Usuario

  subscription: Subscription = new Subscription();

  productos: Producto[] = []

  constructor(
    private srvReporte: ReportesService
  ) { }

  ngOnInit(): void {

    this.subscription.add(
      this.srvReporte.obtenerProductosConBajoStock(this.usuario.idempresa).subscribe({
        next:(productos) => {
          this.productos = productos
        },
      })
    )
  }

}
