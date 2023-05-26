import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NuevoPedidoEmpleadoRoutingModule } from './nuevo-pedido-empleado-routing.module';
import { ContenedorNuevoPedidoComponent } from './contenedor-nuevo-pedido/contenedor-nuevo-pedido.component';
import { CrearNuevoPedidoComponent } from './crear-nuevo-pedido/crear-nuevo-pedido.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';


@NgModule({
  declarations: [
    ContenedorNuevoPedidoComponent,
    CrearNuevoPedidoComponent,
    DetalleProductoComponent
  ],
  imports: [
    CommonModule,
    NuevoPedidoEmpleadoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class NuevoPedidoEmpleadoModule { }
