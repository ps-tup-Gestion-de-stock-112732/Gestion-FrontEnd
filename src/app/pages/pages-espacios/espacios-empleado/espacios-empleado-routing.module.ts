import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorEspaciosEmpleadoComponent } from './contenedor-espacios-empleado/contenedor-espacios-empleado.component';
import { ListaEspaciosEmpleadoComponent } from './lista-espacios-empleado/lista-espacios-empleado.component';

const routes: Routes = [
  {
    path: '', component: ContenedorEspaciosEmpleadoComponent, children: [
      { path: 'lista', component: ListaEspaciosEmpleadoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaciosEmpleadoRoutingModule { }
