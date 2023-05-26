import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorContratosComponent } from './contenedor-contratos/contenedor-contratos.component';
import { ListaContratosComponent } from './lista-contratos/lista-contratos.component';

const routes: Routes = [
  {
    path: '', component: ContenedorContratosComponent, children: [
      { path: 'lista', component: ListaContratosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContratoRoutingModule { }
