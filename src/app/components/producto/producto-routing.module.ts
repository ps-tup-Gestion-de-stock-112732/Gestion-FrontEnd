import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProductoComponent } from './main-producto/main-producto.component';
import { CrearProductoComponent } from './crear-producto/crear-producto.component';
import { ListaProductoComponent } from './lista-producto/lista-producto.component';
import { RedirectEmpresaComponent } from '../empleados/redirect-empresa/redirect-empresa.component';

const routes: Routes = [
  {
    path: '', component: MainProductoComponent, children: [
      { path: 'crear', component: CrearProductoComponent },
      { path: 'lista', component: ListaProductoComponent },
      { path: 'redirect', component: RedirectEmpresaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
