import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { MainProductoComponent } from './main-producto/main-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    MainProductoComponent,
    CrearProductoComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ProductoModule { }
