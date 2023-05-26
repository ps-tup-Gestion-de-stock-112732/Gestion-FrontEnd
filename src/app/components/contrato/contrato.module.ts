import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContratoRoutingModule } from './contrato-routing.module';
import { ContenedorContratosComponent } from './contenedor-contratos/contenedor-contratos.component';
import { ListaContratosComponent } from './lista-contratos/lista-contratos.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ContenedorContratosComponent,
    ListaContratosComponent
  ],
  imports: [
    CommonModule,
    ContratoRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ContratoModule { }
