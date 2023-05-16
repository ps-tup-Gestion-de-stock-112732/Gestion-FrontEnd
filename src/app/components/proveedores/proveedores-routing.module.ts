import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorProveedoresComponent } from './contenedor-proveedores/contenedor-proveedores.component';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';

const routes: Routes = [
  {
    path: '', component: ContenedorProveedoresComponent, children: [
      { path: 'lista', component: ListaProveedoresComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
