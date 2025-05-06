import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRol, IViewRol } from '../../interface/interface.interface';
import { Shared } from '../../shared/shared';
import { ServiceService } from '../../service/service.service';
import { Message } from '../../message/message';

@Component({
  selector: 'app-dialog-rol',
  templateUrl: './dialog-rol.component.html',
  styleUrls: ['./dialog-rol.component.css']
})
export class DialogRolComponent implements OnInit {

  title: string = '';
  option: number = 0;

  iRol: IRol;
  inRol: IRol[] = [];
  iViewRol: IViewRol;

  idRol: number = 0;
  rol: string = '';

  constructor(public shared: Shared, public dialog: MatDialogRef<DialogRolComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.option = data['option'];
    this.iViewRol = data['model'];
    this.ngInit(this.option);
  }

  ngOnInit(): void {
  }

  ngInit(option: number): void {

    this.ngController(1);

    switch (option) {
      case 1: {
        this.title = 'Nuevo Rol';
        this.ngClean(5);
        break;
      }
      case 2: {
        this.title = 'Editar Rol';

        this.idRol = this.iViewRol.idRol;
        this.rol = this.iViewRol.rol;
        break;
      }
    }

  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iRol = { id: 0, rol: '', idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaDefault(), activo: true };
        break;
      }
      case 2: {
        this.iViewRol = { idRol: 0, rol: '', fecha: '', activo: true };
        break;
      }
      case 3: {
        this.rol = '';
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.iRol.rol = this.rol;
        this.ngGetRol(3, this.iRol);
        break;
      }
      case 2: {
        this.ngClean(1);
        this.iRol.rol = this.rol;
        this.ngPostRol(this.iRol);
        break;
      }
      case 3: {
        this.ngClean(1);
        this.iRol.id = this.idRol;
        this.iRol.rol = this.rol;
        this.ngPutRol(1, this.iRol);
        break;
      }
    }

  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {

        if (data.length) {
          this.message.dialogMessage('No es posible agregar el rol ' + this.rol + ' debido a que ya se encuentra agregado, intenta con uno diferente.');
          this.ngClean(3);
          b = false;
        }

        break;
      }
    }

    return b;
  }

  async ngGetRol(option: number, model: IRol) {

    await this.service.ngGetRol(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inRol = r['data'];
          this.ngValidate(1, this.inRol);
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

  async ngPostRol(model: IRol) {

    await this.service.ngPostRol(model)
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

  async ngPutRol(option: number, model: IRol) {

    await this.service.ngPutRol(option, model)
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
