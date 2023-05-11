import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './security/auth.guard';
import { PagesError404Component } from './pages/pages-error404/pages-error404.component';
import { PagesLoginComponent } from './pages/pages-login/pages-login.component';
import { PagesRegisterComponent } from './pages/pages-register/pages-register.component';

const routes: Routes = [
  { path: '', redirectTo:'pages-login', pathMatch:'full' },
  { path: 'pages-login', component: PagesLoginComponent },
  { path: 'pages-register', component: PagesRegisterComponent },
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(x => x.PagesModule), canLoad: [AuthGuard] },
  { path: '**', component: PagesError404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
