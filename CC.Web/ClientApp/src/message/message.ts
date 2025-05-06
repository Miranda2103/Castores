import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogMessageComponent } from '../dialog-message/dialog-message.component';

@Injectable({
  providedIn: 'root'
})

export class Message {

  constructor(public dialog: MatDialog) {}

  public dialogMessage(message: string): void {

    this.dialog.open(DialogMessageComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { 'message': message }
    });

  }

}
