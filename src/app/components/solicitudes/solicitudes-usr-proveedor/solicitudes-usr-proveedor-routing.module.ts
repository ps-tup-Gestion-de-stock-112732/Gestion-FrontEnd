import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolUsrProvComponent } from './contenedor-sol-usr-prov/contenedor-sol-usr-prov.component';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolUsrProvComponent, children: [
      { path: 'lista', component: ListaPendientesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesUsrProveedorRoutingModule { }
