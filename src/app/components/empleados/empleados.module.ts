import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadosRoutingModule } from './empleados-routing.module';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { CrearEmpleadosComponent } from './crear-empleados/crear-empleados.component';
import { ModificarEmpleadosComponent } from './modificar-empleados/modificar-empleados.component';
import { EmpleadosComponent } from './empleados.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MasivaEmpleadosComponent } from './masiva-empleados/masiva-empleados.component';
import { ContenedorEmpleadosComponent } from './contenedor-empleados/contenedor-empleados.component';
import { RedirectEmpresaComponent } from './redirect-empresa/redirect-empresa.component';
import { VerAreasComponent } from './ver-areas/ver-areas.component';
import { VerBarriosComponent } from './ver-barrios/ver-barrios.component';


@NgModule({
  declarations: [
    EmpleadosComponent,
    ListaEmpleadosComponent,
    CrearEmpleadosComponent,
    ModificarEmpleadosComponent,
    MasivaEmpleadosComponent,
    ContenedorEmpleadosComponent,
    RedirectEmpresaComponent,
    VerAreasComponent,
    VerBarriosComponent
  ],
  imports: [
    CommonModule,
    EmpleadosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class EmpleadosModule { }
