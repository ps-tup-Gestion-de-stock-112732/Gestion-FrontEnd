import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesVentasRoutingModule } from './solicitudes-ventas-routing.module';
import { ContenedorSolVentasComponent } from './contenedor-sol-ventas/contenedor-sol-ventas.component';
import { ListaSolVentasComponent } from './lista-sol-ventas/lista-sol-ventas.component';
import { DetalleSolVentasComponent } from './detalle-sol-ventas/detalle-sol-ventas.component';
import { PerfilEmpleadoComponent } from './perfil-empleado/perfil-empleado.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from '../solicitudes-gestion-it/solicitudes-gestion-it.module';


@NgModule({
  declarations: [
    ContenedorSolVentasComponent,
    ListaSolVentasComponent,
    DetalleSolVentasComponent,
    PerfilEmpleadoComponent
  ],
  imports: [
    CommonModule,
    SolicitudesVentasRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class SolicitudesVentasModule { }
