import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { FooterComponent } from '../layouts/footer/footer.component';
import { HeaderComponent } from '../layouts/header/header.component';
import { SidebarComponent } from '../layouts/sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesBlankComponent } from './pages-blank/pages-blank.component';
import { PagesContactComponent } from './pages-contact/pages-contact.component';
import { PagesFaqComponent } from './pages-faq/pages-faq.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { EmpleadosComponent } from '../components/empleados/empleados.component';
import { EmpresaComponent } from '../components/empresa/empresa.component';
import { ProveedoresComponent } from '../components/proveedores/proveedores.component';


@NgModule({
  declarations: [
    MainComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesBlankComponent,
    EmpleadosComponent,
    ProveedoresComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
