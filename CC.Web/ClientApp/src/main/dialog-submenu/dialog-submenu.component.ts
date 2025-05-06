import { Component, Inject, OnInit } from '@angular/core';
import { ISubMenu, IViewSubMenu } from '../../interface/interface.interface';
import { Shared } from '../../shared/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../service/service.service';
import { Message } from '../../message/message';

@Component({
  selector: 'app-dialog-submenu',
  templateUrl: './dialog-submenu.component.html',
  styleUrls: ['./dialog-submenu.component.css']
})
export class DialogSubMenuComponent implements OnInit {

  iViewSubMenu: IViewSubMenu;
  iSubMenu: ISubMenu;

  menu: string = '';
  subMenu: string = '';
  orden: number = 0;

  constructor(public shared: Shared, public dialog: MatDialogRef<DialogSubMenuComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.iViewSubMenu = data['model'];
    this.ngInit(1);
  }

  ngOnInit(): void {
  }

  ngInit(option: number): void {

    switch (option) {
      case 1: {
        this.menu = this.iViewSubMenu.menu;
        this.subMenu = this.iViewSubMenu.subMenu;
        this.orden = this.iViewSubMenu.orden;
        break;
      }
    }

  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iSubMenu = { id: 0, idMenu: 0, subMenu: '', ruta: '', icono: '', orden: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true }
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);

        this.iSubMenu.id = this.iViewSubMenu.idSubMenu;
        this.iSubMenu.subMenu = this.subMenu;
        this.iSubMenu.orden = this.orden;

        this.ngPutSubMenu(1, this.iSubMenu);
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

  async ngPutSubMenu(option: number, model: ISubMenu) {

    await this.service.ngPutSubMenu(option, model)
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
