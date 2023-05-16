import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { ContenedorProveedoresComponent } from './contenedor-proveedores/contenedor-proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ListaProveedoresComponent,
    ContenedorProveedoresComponent
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
