import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesUsrProveedorRoutingModule } from './solicitudes-usr-proveedor-routing.module';
import { ContenedorSolUsrProvComponent } from './contenedor-sol-usr-prov/contenedor-sol-usr-prov.component';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ContenedorSolUsrProvComponent,
    ListaPendientesComponent
  ],
  imports: [
    CommonModule,
    SolicitudesUsrProveedorRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SolicitudesUsrProveedorModule { }
