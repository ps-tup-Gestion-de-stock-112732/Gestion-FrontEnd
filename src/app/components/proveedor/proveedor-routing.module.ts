import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainProveedorComponent } from './main-proveedor/main-proveedor.component';
import { ListaProveedorComponent } from './lista-proveedor/lista-proveedor.component';
import { CrearProveedorComponent } from './crear-proveedor/crear-proveedor.component';
import { ModificarProveedorComponent } from './modificar-proveedor/modificar-proveedor.component';
import { EnEsperaComponent } from './en-espera/en-espera.component';

const routes: Routes = [
  {
    path: '', component: MainProveedorComponent, children: [
      { path: 'lista', component: ListaProveedorComponent },
      { path: 'crear', component: CrearProveedorComponent },
      { path: 'modificar/:id', component: ModificarProveedorComponent },
      { path: 'en-espera', component: EnEsperaComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedorRoutingModule { }
