import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { MainProductoComponent } from './main-producto/main-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { RedirectEmpresaComponent } from './redirect-empresa/redirect-empresa.component';
import { ModificarProductoComponent } from './modificar-producto/modificar-producto.component';


@NgModule({
  declarations: [
    MainProductoComponent,
    CrearProductoComponent,
    ListaProductoComponent,
    RedirectEmpresaComponent,
    ModificarProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProductoModule { }
