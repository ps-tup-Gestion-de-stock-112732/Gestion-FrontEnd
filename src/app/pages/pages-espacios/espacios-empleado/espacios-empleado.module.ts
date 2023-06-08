import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaciosEmpleadoRoutingModule } from './espacios-empleado-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from 'src/app/components/solicitudes/solicitudes-gestion-it/solicitudes-gestion-it.module';
import { ContenedorEspaciosEmpleadoComponent } from './contenedor-espacios-empleado/contenedor-espacios-empleado.component';
import { ListaEspaciosEmpleadoComponent } from './lista-espacios-empleado/lista-espacios-empleado.component';


@NgModule({
  declarations: [
    ContenedorEspaciosEmpleadoComponent,
    ListaEspaciosEmpleadoComponent
  ],
  imports: [
    CommonModule,
    EspaciosEmpleadoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class EspaciosEmpleadoModule { }
