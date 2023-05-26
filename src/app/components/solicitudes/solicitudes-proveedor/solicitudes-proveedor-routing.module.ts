import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolProvComponent } from './contenedor-sol-prov/contenedor-sol-prov.component';
import { ListaSolProvComponent } from './lista-sol-prov/lista-sol-prov.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolProvComponent, children: [
      { path: 'lista', component: ListaSolProvComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesProveedorRoutingModule { }
