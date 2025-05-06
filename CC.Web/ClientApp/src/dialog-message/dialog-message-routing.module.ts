import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogMessageComponent } from './dialog-message.component';

const routes: Routes = [
  { path: '', component: DialogMessageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogMessageRoutingModule { }
