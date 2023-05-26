import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa.component';
import { ListaEmpresasComponent } from './lista-empresas/lista-empresas.component';
import { CrearEmpresaComponent } from './crear-empresa/crear-empresa.component';
import { ModificarEmpresaComponent } from './modificar-empresa/modificar-empresa.component';
import { ContenedorEmpresaComponent } from './contenedor-empresa/contenedor-empresa.component';
import { AreasEmpresaComponent } from './areas-empresa/areas-empresa.component';
import { EnEsperaComponent } from './en-espera/en-espera.component';

const routes: Routes = [
  {
    path: '', component: ContenedorEmpresaComponent, children: [
      { path: 'main', component: EmpresaComponent },
      { path: 'lista', component: ListaEmpresasComponent },
      { path: 'crear', component: CrearEmpresaComponent },
      { path: 'modificar', component: ModificarEmpresaComponent },
      { path: 'areas/:id', component: AreasEmpresaComponent },
      { path: 'en-espera', component: EnEsperaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
