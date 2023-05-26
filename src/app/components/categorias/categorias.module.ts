import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriasRoutingModule } from './categorias-routing.module';
import { ContenedorCategoriasComponent } from './contenedor-categorias/contenedor-categorias.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ContenedorCategoriasComponent,
    ListaCategoriasComponent
  ],
  imports: [
    CommonModule,
    CategoriasRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class CategoriasModule { }
