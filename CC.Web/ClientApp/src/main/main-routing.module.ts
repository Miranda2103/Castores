import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { RolMenuComponent } from './rol-menu/rol-menu.component';
import { DialogRolSubMenuComponent } from './dialog-rol-submenu/dialog-rol-submenu.component';
import { DialogMenuComponent } from './dialog-menu/dialog-menu.component';
import { DialogSubMenuComponent } from './dialog-submenu/dialog-submenu.component';
import { RolComponent } from './rol/rol.component';
import { DialogRolComponent } from './dialog-rol/dialog-rol.component';
import { ProductsEntryComponent } from './products-entry/products-entry.component';
import { ProductsOutputComponent } from './products-output/products-output.component';
import { ProductsHistoryComponent } from './products-history/products-history.component';
import { DialogProductsEntryComponent } from './dialog-products-entry/dialog-products-entry.component';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      { path: 'dialog-message', loadChildren: () => import('src/dialog-message/dialog-message.module').then(m => m.DialogMessageModule) },
      { path: 'dialog-confirmation', loadChildren: () => import('src/dialog-confirmation/dialog-confirmation.module').then(m => m.DialogConfirmationModule) },
      { path: 'home', component: HomeComponent },
      { path: 'user', component: UserComponent },
      { path: 'dialog-user', component: DialogUserComponent },
      { path: 'rol-menu', component: RolMenuComponent },
      { path: 'dialog-menu', component: DialogMenuComponent },
      { path: 'dialog-rol-submenu', component: DialogRolSubMenuComponent },
      { path: 'dialog-submenu', component: DialogSubMenuComponent },
      { path: 'rol', component: RolComponent },
      { path: 'dialog-rol', component: DialogRolComponent },
      { path: 'products-entry', component: ProductsEntryComponent },
      { path: 'products-output', component: ProductsOutputComponent },
      { path: 'products-history', component: ProductsHistoryComponent },
      { path: 'dialog-products-entry', component: DialogProductsEntryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
