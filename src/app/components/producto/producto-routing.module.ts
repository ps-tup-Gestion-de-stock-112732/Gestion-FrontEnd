import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProductoComponent } from './main-producto/main-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';

const routes: Routes = [
  {
    path: '', component: MainProductoComponent, children: [
      { path: 'crear', component: CrearProductoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
