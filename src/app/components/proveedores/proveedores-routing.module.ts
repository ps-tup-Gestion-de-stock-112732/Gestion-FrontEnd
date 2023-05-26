import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorProveedoresComponent } from './contenedor-proveedores/contenedor-proveedores.component';
import { ListaProveedoresComponent } from './lista-proveedores/lista-proveedores.component';
import { ListaAsociadosComponent } from './lista-asociados/lista-asociados.component';
import { ListaPendientesComponent } from './lista-pendientes/lista-pendientes.component';

const routes: Routes = [
  {
    path: '', component: ContenedorProveedoresComponent, children: [
      { path: 'lista', component: ListaProveedoresComponent },
      { path: 'asociados', component: ListaAsociadosComponent },
      { path: 'pendientes', component: ListaPendientesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
