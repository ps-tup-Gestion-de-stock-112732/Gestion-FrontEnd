import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AutorizantesRoutingModule } from './autorizantes-routing.module';
import { ContenedorAutorizantesComponent } from './contenedor-autorizantes/contenedor-autorizantes.component';
import { CrearAutorizantesComponent } from './crear-autorizantes/crear-autorizantes.component';
import { ListaAutorizantesComponent } from './lista-autorizantes/lista-autorizantes.component';
import { ModificarAutorizantesComponent } from './modificar-autorizantes/modificar-autorizantes.component';
import { RedirectEmpresaComponent } from './redirect-empresa/redirect-empresa.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ContenedorAutorizantesComponent,
    CrearAutorizantesComponent,
    ListaAutorizantesComponent,
    ModificarAutorizantesComponent,
    RedirectEmpresaComponent
  ],
  imports: [
    CommonModule,
    AutorizantesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class AutorizantesModule { }
