import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorNuevoPedidoComponent } from './contenedor-nuevo-pedido/contenedor-nuevo-pedido.component';
import { CrearNuevoPedidoComponent } from './crear-nuevo-pedido/crear-nuevo-pedido.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

const routes: Routes = [
  {
    path: '', component: ContenedorNuevoPedidoComponent, children: [
      { path: 'nuevo', component: CrearNuevoPedidoComponent },
      { path: 'producto/detalle/:id', component: DetalleProductoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NuevoPedidoEmpleadoRoutingModule { }
