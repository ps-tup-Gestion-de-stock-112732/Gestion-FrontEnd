import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { ContenedorProveedoresComponent } from './contenedor-proveedores/contenedor-proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';
import { ListaAsociadosComponent } from './lista-asociados/lista-asociados.component';


@NgModule({
  declarations: [
    ListaProveedoresComponent,
    ContenedorProveedoresComponent,
    ListaPendientesComponent,
    ListaAsociadosComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProveedoresModule { }
