import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadosComponent } from './empleados.component';
import { ListaEmpleadosComponent } from './lista-empleados/lista-empleados.component';
import { CrearEmpleadosComponent } from './crear-empleados/crear-empleados.component';
import { ModificarEmpleadosComponent } from './modificar-empleados/modificar-empleados.component';
import { MasivaEmpleadosComponent } from './masiva-empleados/masiva-empleados.component';
import { ContenedorEmpleadosComponent } from './contenedor-empleados/contenedor-empleados.component';
import { RedirectEmpresaComponent } from './redirect-empresa/redirect-empresa.component';
import { VerAreasComponent } from './ver-areas/ver-areas.component';
import { VerBarriosComponent } from './ver-barrios/ver-barrios.component';

const routes: Routes = [
  {
    path: '', component: ContenedorEmpleadosComponent, children: [
      { path: 'main', component: EmpleadosComponent },
      { path: 'lista', component: ListaEmpleadosComponent },
      { path: 'crear', component: CrearEmpleadosComponent },
      { path: 'modificar/:id', component: ModificarEmpleadosComponent },
      { path: 'masiva', component: MasivaEmpleadosComponent },
      { path: 'redirect', component: RedirectEmpresaComponent },
      { path: 'areas/:id', component: VerAreasComponent },
      { path: 'barrios', component: VerBarriosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadosRoutingModule { }
