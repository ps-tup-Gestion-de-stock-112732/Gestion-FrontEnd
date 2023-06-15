import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ProveedoresComponent } from 'src/app/components/resportes/proveedores/proveedores.component';
import { GestionComponent } from 'src/app/components/resportes/gestion/gestion.component';
import { WelcomeComponent } from 'src/app/components/resportes/welcome/welcome.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, children: [
      { path: 'reportes/proveedor', component: ProveedoresComponent },
      { path: 'reportes/gestion', component: GestionComponent },
      { path: 'reportes/welcome', component: WelcomeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
