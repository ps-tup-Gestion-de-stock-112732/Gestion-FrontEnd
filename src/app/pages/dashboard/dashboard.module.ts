import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProveedoresComponent } from 'src/app/components/resportes/proveedores/proveedores.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { SolicitudesGestionItModule } from 'src/app/components/solicitudes/solicitudes-gestion-it/solicitudes-gestion-it.module';
import { NgChartsModule } from 'ng2-charts';
import { BannersComponent } from 'src/app/components/resportes/proveedores/banners/banners.component';
import { StockBajoComponent } from 'src/app/components/resportes/proveedores/stock-bajo/stock-bajo.component';
import { GestionComponent } from 'src/app/components/resportes/gestion/gestion.component';
import { BannersGestionComponent } from 'src/app/components/resportes/gestion/banners-gestion/banners-gestion.component';
import { EspaciosGestionComponent } from 'src/app/components/resportes/gestion/espacios-gestion/espacios-gestion.component';
import { SolicitudesGestionComponent } from 'src/app/components/resportes/gestion/solicitudes-gestion/solicitudes-gestion.component';
import { WelcomeComponent } from 'src/app/components/resportes/welcome/welcome.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ProveedoresComponent,
    BannersComponent,
    StockBajoComponent,
    GestionComponent,
    BannersGestionComponent,
    EspaciosGestionComponent,
    SolicitudesGestionComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SolicitudesGestionItModule,
    NgChartsModule
  ]
})
export class DashboardModule { }
