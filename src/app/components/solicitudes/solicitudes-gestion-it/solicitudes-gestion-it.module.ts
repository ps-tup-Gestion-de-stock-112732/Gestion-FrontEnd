import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesGestionItRoutingModule } from './solicitudes-gestion-it-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContenedorSolGestionItComponent } from './contenedor-sol-gestion-it/contenedor-sol-gestion-it.component';
import { ListaSolGestionItComponent } from './lista-sol-gestion-it/lista-sol-gestion-it.component';
import { RecortarStringsPipe } from 'src/app/pipes/recortar-strings.pipe';
import { DetalleSolGestionItComponent } from './detalle-sol-gestion-it/detalle-sol-gestion-it.component';


@NgModule({
  declarations: [
    ContenedorSolGestionItComponent,
    ListaSolGestionItComponent,
    RecortarStringsPipe,
    DetalleSolGestionItComponent
  ],
  imports: [
    CommonModule,
    SolicitudesGestionItRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SolicitudesGestionItModule { }
