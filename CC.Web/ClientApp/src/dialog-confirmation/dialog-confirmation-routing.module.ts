import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

const routes: Routes = [
  { path: '', component: DialogConfirmationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DialogConfirmationRoutingModule { }
