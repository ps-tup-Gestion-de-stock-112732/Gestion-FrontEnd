import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosProveedorRoutingModule } from './pedidos-proveedor-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContenedorPedidosProveedorComponent } from './contenedor-pedidos-proveedor/contenedor-pedidos-proveedor.component';
import { ListaPedidosProveedorComponent } from './lista-pedidos-proveedor/lista-pedidos-proveedor.component';
import { SolicitudesGestionItModule } from '../../solicitudes/solicitudes-gestion-it/solicitudes-gestion-it.module';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';


@NgModule({
  declarations: [
    ContenedorPedidosProveedorComponent,
    ListaPedidosProveedorComponent,
    DetallePedidoComponent
  ],
  imports: [
    CommonModule,
    PedidosProveedorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class PedidosProveedorModule { }
