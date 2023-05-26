import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorPedidosEmpleadoComponent } from './contenedor-pedidos-empleado/contenedor-pedidos-empleado.component';
import { ListadoProductosComponent } from './listado-productos/listado-productos.component';

const routes: Routes = [
  {
    path: '', component: ContenedorPedidosEmpleadoComponent, children: [
      { path: 'lista', component: ListadoProductosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosEmpleadoRoutingModule { }
