import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaciosGestionRoutingModule } from './espacios-gestion-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from 'src/app/components/solicitudes/solicitudes-gestion-it/solicitudes-gestion-it.module';
import { ContenedorEspaciosGestionComponent } from './contenedor-espacios-gestion/contenedor-espacios-gestion.component';


@NgModule({
  declarations: [
    ContenedorEspaciosGestionComponent
  ],
  imports: [
    CommonModule,
    EspaciosGestionRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule
  ]
})
export class EspaciosGestionModule { }
