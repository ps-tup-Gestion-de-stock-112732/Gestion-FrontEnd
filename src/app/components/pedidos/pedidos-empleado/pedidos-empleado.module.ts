import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosEmpleadoRoutingModule } from './pedidos-empleado-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContenedorPedidosEmpleadoComponent } from './contenedor-pedidos-empleado/contenedor-pedidos-empleado.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';


@NgModule({
  declarations: [
    ContenedorPedidosEmpleadoComponent,
    ListadoProductosComponent
  ],
  imports: [
    CommonModule,
    PedidosEmpleadoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PedidosEmpleadoModule { }
