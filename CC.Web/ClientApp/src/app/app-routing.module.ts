import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DialogChangePasswordComponent } from './dialog-change-password/dialog-change-password.component';

const routes: Routes = [
  { path: 'app', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dialog-change-password', component: DialogChangePasswordComponent },
  { path: 'main', loadChildren: () => import('src/main/main.module').then(m => m.MainModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
