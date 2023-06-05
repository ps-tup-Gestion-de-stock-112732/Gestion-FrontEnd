import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorPedidosProveedorComponent } from './contenedor-pedidos-proveedor/contenedor-pedidos-proveedor.component';
import { ListaPedidosProveedorComponent } from './lista-pedidos-proveedor/lista-pedidos-proveedor.component';
import { DetallePedidoComponent } from './detalle-pedido/detalle-pedido.component';

const routes: Routes = [
  {
    path: '', component: ContenedorPedidosProveedorComponent, children: [
      { path: 'lista', component: ListaPedidosProveedorComponent },
      { path: 'detalle/:id', component: DetallePedidoComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosProveedorRoutingModule { }
