import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../security/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbsComponent } from '../components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from '../components/buttons/buttons.component';
import { CardsComponent } from '../components/cards/cards.component';
import { CarouselComponent } from '../components/carousel/carousel.component';
import { ChartsApexchartsComponent } from '../components/charts-apexcharts/charts-apexcharts.component';
import { ChartsChartjsComponent } from '../components/charts-chartjs/charts-chartjs.component';
import { FormsEditorsComponent } from '../components/forms-editors/forms-editors.component';
import { FormsElementsComponent } from '../components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from '../components/forms-layouts/forms-layouts.component';
import { IconsBootstrapComponent } from '../components/icons-bootstrap/icons-bootstrap.component';
import { IconsBoxiconsComponent } from '../components/icons-boxicons/icons-boxicons.component';
import { IconsRemixComponent } from '../components/icons-remix/icons-remix.component';
import { ListGroupComponent } from '../components/list-group/list-group.component';
import { ModalComponent } from '../components/modal/modal.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { ProgressComponent } from '../components/progress/progress.component';
import { SpinnersComponent } from '../components/spinners/spinners.component';
import { TablesDataComponent } from '../components/tables-data/tables-data.component';
import { TablesGeneralComponent } from '../components/tables-general/tables-general.component';
import { TabsComponent } from '../components/tabs/tabs.component';
import { TooltipsComponent } from '../components/tooltips/tooltips.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages-contact/pages-contact.component';
import { PagesFaqComponent } from './pages-faq/pages-faq.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'breadcrumbs', component: BreadcrumbsComponent },
      { path: 'buttons', component: ButtonsComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'carousel', component: CarouselComponent },
      { path: 'charts-apexcharts', component: ChartsApexchartsComponent },
      { path: 'charts-chartjs', component: ChartsChartjsComponent },
      { path: 'form-editors', component: FormsEditorsComponent },
      { path: 'form-elements', component: FormsElementsComponent },
      { path: 'form-layouts', component: FormsLayoutsComponent },
      { path: 'icons-bootstrap', component: IconsBootstrapComponent },
      { path: 'icons-boxicons', component: IconsBoxiconsComponent },
      { path: 'icons-remix', component: IconsRemixComponent },
      { path: 'list-group', component: ListGroupComponent },
      { path: 'modal', component: ModalComponent },
      { path: 'pagination', component: PaginationComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'spinners', component: SpinnersComponent },
      { path: 'tables-data', component: TablesDataComponent },
      { path: 'tables-general', component: TablesGeneralComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'tooltips', component: TooltipsComponent },
      { path: 'pages-blank', component: PagesBlankComponent },
      { path: 'pages-contact', component: PagesContactComponent },
      { path: 'pages-faq', component: PagesFaqComponent },
      { path: 'user-profile', component: UsersProfileComponent },
      { path: 'empresa', loadChildren: () => import('../components/empresa/empresa.module').then(x => x.EmpresaModule), canLoad: [AuthGuard] },
      { path: 'empleados', loadChildren: () => import('../components/empleados/empleados.module').then(x => x.EmpleadosModule), canLoad: [AuthGuard] },
      { path: 'proveedores', loadChildren: () => import('../components/proveedores/proveedores.module').then(x => x.ProveedoresModule), canLoad: [AuthGuard] },
      { path: 'proveedor', loadChildren: () => import('../components/proveedor/proveedor.module').then(x => x.ProveedorModule), canLoad: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
