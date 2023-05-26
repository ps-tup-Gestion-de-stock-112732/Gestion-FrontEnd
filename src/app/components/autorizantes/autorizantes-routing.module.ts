import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorAutorizantesComponent } from './contenedor-autorizantes/contenedor-autorizantes.component';
import { ListaAutorizantesComponent } from './lista-autorizantes/lista-autorizantes.component';
import { CrearAutorizantesComponent } from './crear-autorizantes/crear-autorizantes.component';
import { ModificarAutorizantesComponent } from './modificar-autorizantes/modificar-autorizantes.component';
import { RedirectEmpresaComponent } from './redirect-empresa/redirect-empresa.component';

const routes: Routes = [
  {
    path: '', component: ContenedorAutorizantesComponent, children: [
      { path: 'lista', component: ListaAutorizantesComponent },
      { path: 'crear', component: CrearAutorizantesComponent },
      { path: 'modificar/:id', component: ModificarAutorizantesComponent },
      { path: 'redirect', component: RedirectEmpresaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AutorizantesRoutingModule { }
