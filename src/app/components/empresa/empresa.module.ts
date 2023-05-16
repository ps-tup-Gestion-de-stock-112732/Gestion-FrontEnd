import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpresaRoutingModule } from './empresa-routing.module';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { ModificarEmpresaComponent } from './modificar-empresa/modificar-empresa.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { EmpresaComponent } from './empresa.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContenedorEmpresaComponent } from './contenedor-empresa/contenedor-empresa.component';
import { AreasEmpresaComponent } from './areas-empresa/areas-empresa.component';


@NgModule({
  declarations: [
    EmpresaComponent,
    ListaEmpresasComponent,
    CrearEmpresaComponent,
    ModificarEmpresaComponent,
    ContenedorEmpresaComponent,
    AreasEmpresaComponent
  ],
  imports: [
    CommonModule,
    EmpresaRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class EmpresaModule { }
