import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservasEmpleadoRoutingModule } from './reservas-empleado-routing.module';
import { ContenedorReservasEmpleadoComponent } from './contenedor-reservas-empleado/contenedor-reservas-empleado.component';
import { ListaReservasEmpleadoComponent } from './lista-reservas-empleado/lista-reservas-empleado.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from 'src/app/components/solicitudes/solicitudes-gestion-it/solicitudes-gestion-it.module';


@NgModule({
  declarations: [
    ContenedorReservasEmpleadoComponent,
    ListaReservasEmpleadoComponent
  ],
  imports: [
    CommonModule,
    ReservasEmpleadoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class ReservasEmpleadoModule { }
