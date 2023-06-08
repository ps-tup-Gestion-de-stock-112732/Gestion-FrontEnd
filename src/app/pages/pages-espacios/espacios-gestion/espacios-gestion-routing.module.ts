import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorEspaciosGestionComponent } from './contenedor-espacios-gestion/contenedor-espacios-gestion.component';
import { ListaEspaciosGestionComponent } from './lista-espacios-gestion/lista-espacios-gestion.component';
import { CrearEspaciosGestionComponent } from './crear-espacios-gestion/crear-espacios-gestion.component';
import { ModificarEspaciosGestionComponent } from './modificar-espacios-gestion/modificar-espacios-gestion.component';

const routes: Routes = [
  {
    path: '', component: ContenedorEspaciosGestionComponent, children: [
      { path: 'lista', component: ListaEspaciosGestionComponent },
      { path: 'crear', component: CrearEspaciosGestionComponent },
      { path: 'modificar/:id', component: ModificarEspaciosGestionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaciosGestionRoutingModule { }
