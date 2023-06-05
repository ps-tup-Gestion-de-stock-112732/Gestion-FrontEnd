import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesEmpleadoRoutingModule } from './solicitudes-empleado-routing.module';
import { ContenedorSolEmpleadoComponent } from './contenedor-sol-empleado/contenedor-sol-empleado.component';
import { ListaSolEmpleadoComponent } from './lista-sol-empleado/lista-sol-empleado.component';
import { DetalleSolEmpleadoComponent } from './detalle-sol-empleado/detalle-sol-empleado.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from '../solicitudes-gestion-it/solicitudes-gestion-it.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    ContenedorSolEmpleadoComponent,
    ListaSolEmpleadoComponent,
    DetalleSolEmpleadoComponent
  ],
  imports: [
    CommonModule,
    SolicitudesEmpleadoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class SolicitudesEmpleadoModule { }
