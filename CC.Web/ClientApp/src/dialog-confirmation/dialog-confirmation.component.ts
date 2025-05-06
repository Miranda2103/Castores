import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Shared } from '../shared/shared';

@Component({
  selector: 'app-dialog-confirmation',
  templateUrl: './dialog-confirmation.component.html',
  styleUrls: ['./dialog-confirmation.component.css']
})
export class DialogConfirmationComponent implements AfterViewInit {

  @ViewChild('button') button: MatButton;

  message: string = '';

  constructor(public shared: Shared, public dialog: MatDialogRef<DialogConfirmationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data['message'];
  }

  ngAfterViewInit() {
    this.button.focus();
  }

}
