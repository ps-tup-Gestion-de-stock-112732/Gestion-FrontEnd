import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolVentasComponent } from './contenedor-sol-ventas/contenedor-sol-ventas.component';
import { ListaSolVentasComponent } from './lista-sol-ventas/lista-sol-ventas.component';
import { DetalleSolVentasComponent } from './detalle-sol-ventas/detalle-sol-ventas.component';
import { PerfilEmpleadoComponent } from './perfil-empleado/perfil-empleado.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolVentasComponent, children: [
      { path: 'lista', component: ListaSolVentasComponent },
      { path: 'detalle/:id', component: DetalleSolVentasComponent },
      { path: 'perfil', component: PerfilEmpleadoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesVentasRoutingModule { }
