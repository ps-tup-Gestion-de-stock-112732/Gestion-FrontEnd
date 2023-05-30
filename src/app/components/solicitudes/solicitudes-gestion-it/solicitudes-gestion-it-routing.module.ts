import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolGestionItComponent } from './contenedor-sol-gestion-it/contenedor-sol-gestion-it.component';
import { ListaSolGestionItComponent } from './lista-sol-gestion-it/lista-sol-gestion-it.component';
import { DetalleSolGestionItComponent } from './detalle-sol-gestion-it/detalle-sol-gestion-it.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolGestionItComponent, children: [
      { path: 'lista', component: ListaSolGestionItComponent },
      { path: 'detalle/:id', component: DetalleSolGestionItComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesGestionItRoutingModule { }
