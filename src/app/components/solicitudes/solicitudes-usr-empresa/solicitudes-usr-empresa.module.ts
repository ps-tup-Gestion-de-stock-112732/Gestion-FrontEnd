import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesUsrEmpresaRoutingModule } from './solicitudes-usr-empresa-routing.module';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';
import { ContenedorSolUsrEmpComponent } from './contenedor-sol-usr-emp/contenedor-sol-usr-emp.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListaPendientesComponent,
    ContenedorSolUsrEmpComponent
  ],
  imports: [
    CommonModule,
    SolicitudesUsrEmpresaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class SolicitudesUsrEmpresaModule { }
