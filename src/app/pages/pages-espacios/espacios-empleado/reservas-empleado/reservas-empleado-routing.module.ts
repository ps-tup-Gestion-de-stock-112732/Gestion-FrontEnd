import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorReservasEmpleadoComponent } from './contenedor-reservas-empleado/contenedor-reservas-empleado.component';
import { ListaReservasEmpleadoComponent } from './lista-reservas-empleado/lista-reservas-empleado.component';

const routes: Routes = [
  {
    path: '', component: ContenedorReservasEmpleadoComponent, children: [
      { path: 'lista', component: ListaReservasEmpleadoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservasEmpleadoRoutingModule { }
