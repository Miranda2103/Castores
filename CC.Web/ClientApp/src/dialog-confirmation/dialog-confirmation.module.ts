import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DialogConfirmationRoutingModule } from './dialog-confirmation-routing.module';
import { DialogConfirmationComponent } from './dialog-confirmation.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    DialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    DialogConfirmationRoutingModule,
    FormsModule,

    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule
  ]
})
export class DialogConfirmationModule { }
