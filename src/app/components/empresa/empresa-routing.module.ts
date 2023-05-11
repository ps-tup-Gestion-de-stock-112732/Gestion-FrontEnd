import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { ModificarEmpresaComponent } from './modificar-empresa/modificar-empresa.component';

const routes: Routes = [
  {
    path: '', component: EmpresaComponent, children: [
      { path: 'lista', component: ListaEmpresasComponent },
      { path: 'crear', component: CrearEmpresaComponent },
      { path: 'modificar', component: ModificarEmpresaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
