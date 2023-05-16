import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProveedorRoutingModule } from './proveedor-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { MainProveedorComponent } from './main-proveedor/main-proveedor.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';


@NgModule({
  declarations: [
    MainProveedorComponent,
    ListaProveedorComponent,
    CrearProveedorComponent,
    ModificarProveedorComponent
  ],
  imports: [
    CommonModule,
    ProveedorRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProveedorModule { }
