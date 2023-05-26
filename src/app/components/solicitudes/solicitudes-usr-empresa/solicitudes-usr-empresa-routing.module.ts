import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolUsrEmpComponent } from './contenedor-sol-usr-emp/contenedor-sol-usr-emp.component';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolUsrEmpComponent, children: [
      { path: 'lista', component: ListaPendientesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesUsrEmpresaRoutingModule { }
