import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorSolEmpleadoComponent } from './contenedor-sol-empleado/contenedor-sol-empleado.component';
import { ListaSolEmpleadoComponent } from './lista-sol-empleado/lista-sol-empleado.component';
import { DetalleSolEmpleadoComponent } from './detalle-sol-empleado/detalle-sol-empleado.component';

const routes: Routes = [
  {
    path: '', component: ContenedorSolEmpleadoComponent, children: [
      { path: 'lista', component: ListaSolEmpleadoComponent },
      { path: 'detalle/:id', component: DetalleSolEmpleadoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesEmpleadoRoutingModule { }
