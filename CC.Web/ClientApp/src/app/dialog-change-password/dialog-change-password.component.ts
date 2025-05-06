import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUsuario } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-dialog-change-password',
  templateUrl: './dialog-change-password.component.html',
  styleUrls: ['./dialog-change-password.component.css']
})
export class DialogChangePasswordComponent {

  iUsuario: IUsuario;

  idUsuario: number = 0;
  usuario: string = '';
  contrasena: string = '';
  contrasenaNueva: string = '';
  contrasenaConfirma: string = '';

  constructor(public shared: Shared, public dialog: MatDialogRef<DialogChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.idUsuario = data['idUsuario'];
    this.usuario = data['usuario'];
    this.contrasena = data['contrasena'];
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iUsuario = { id: 0, usuario: '', contrasena: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', nombreCompleto: '', cambiaContrasena: false, idRol: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
    }

  }

  ngModel(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iUsuario.id = this.idUsuario;
        this.iUsuario.usuario = this.usuario;
        this.iUsuario.contrasena = this.contrasenaNueva;
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        if (this.ngValidate(1)) {
          this.ngClean(1);
          this.ngModel(1);
          this.ngPutUsuario(2, this.iUsuario);
        }
        break;
      }
    }

  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {
        if (this.contrasenaNueva != this.contrasenaConfirma) {
          b = false;
          this.message.dialogMessage('Contraseñas incorrectas, ingresa nuevamente la contraseña y confirma.');
        }
        break;
      }
    }

    return b;
  }

  async ngPutUsuario(option: number, model: IUsuario) {

    await this.service.ngPutUsuario(option, model)
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
