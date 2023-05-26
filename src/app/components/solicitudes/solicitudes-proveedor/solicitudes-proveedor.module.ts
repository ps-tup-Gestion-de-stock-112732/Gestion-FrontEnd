import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesProveedorRoutingModule } from './solicitudes-proveedor-routing.module';
import { ContenedorSolProvComponent } from './contenedor-sol-prov/contenedor-sol-prov.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaSolProvComponent } from './lista-sol-prov/lista-sol-prov.component';


@NgModule({
  declarations: [
    ContenedorSolProvComponent,
    ListaSolProvComponent
  ],
  imports: [
    CommonModule,
    SolicitudesProveedorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SolicitudesProveedorModule { }
