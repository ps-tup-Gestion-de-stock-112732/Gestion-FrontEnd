import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorCategoriasComponent } from './contenedor-categorias/contenedor-categorias.component';
import { ListaCategoriasComponent } from './lista-categorias/lista-categorias.component';

const routes: Routes = [
  {
    path: '', component: ContenedorCategoriasComponent, children: [
      { path: 'lista', component: ListaCategoriasComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriasRoutingModule { }
