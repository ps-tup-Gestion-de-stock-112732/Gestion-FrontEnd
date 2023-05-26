import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosProveedorRoutingModule } from './pedidos-proveedor-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContenedorPedidosProveedorComponent } from './contenedor-pedidos-proveedor/contenedor-pedidos-proveedor.component';


@NgModule({
  declarations: [
    ContenedorPedidosProveedorComponent
  ],
  imports: [
    CommonModule,
    PedidosProveedorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class PedidosProveedorModule { }
