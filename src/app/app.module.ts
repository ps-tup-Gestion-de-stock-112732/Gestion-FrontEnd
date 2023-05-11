import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';

import { AuthService } from './services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegistroService } from './services/registro.service';
import { InterceptorProviders } from './services/interceptor.interceptor';
import { PagesModule } from './pages/pages.module';
import { EmpresaModule } from './components/empresa/empresa.module';

@NgModule({
  declarations: [
    AppComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    PagesModule,
    EmpresaModule
  ],
  providers: [AuthService, RegistroService, InterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
