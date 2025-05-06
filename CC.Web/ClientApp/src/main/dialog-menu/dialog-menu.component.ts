import { Component, Inject, OnInit } from '@angular/core';
import { IMenu, IViewMenu } from '../../interface/interface.interface';
import { Shared } from '../../shared/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../service/service.service';
import { Message } from '../../message/message';

@Component({
  selector: 'app-dialog-menu',
  templateUrl: './dialog-menu.component.html',
  styleUrls: ['./dialog-menu.component.css']
})
export class DialogMenuComponent implements OnInit {

  iMenu: IMenu;
  iViewMenu: IViewMenu;

  menu: string = '';
  icono: string = '';
  orden: number = 0;

  constructor(public shared: Shared, public dialog: MatDialogRef<DialogMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.iViewMenu = data['model'];
    this.ngInit(1);
  }

  ngOnInit(): void {
  }

  ngInit(option: number): void {

    switch (option) {
      case 1: {
        this.menu = this.iViewMenu.menu;
        this.icono = this.iViewMenu.icono;
        this.orden = this.iViewMenu.orden;
        break;
      }
    }

  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iMenu = { id: 0, menu: '', ruta: '', icono: '', orden: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true }
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);

        this.iMenu.id = this.iViewMenu.idMenu;
        this.iMenu.menu = this.menu;
        this.iMenu.icono = this.icono;
        this.iMenu.orden = this.orden;

        this.ngPutMenu(1, this.iMenu);
        break;
      }
    }

  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {

        break;
      }
    }

    return b;
  }

  async ngPutMenu(option: number, model: IMenu) {

    await this.service.ngPutMenu(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.dialog.close(true);
        } else {
          this.message.dialogMessage(this.shared.ngFalse());
        }

      }).catch(
        (e: any) => {
          console.error(e);
          this.message.dialogMessage(this.shared.ngError(e));
        }
      ).finally(() => { });

  }

}
