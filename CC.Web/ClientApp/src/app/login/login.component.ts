import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IAutenticacion, IResponse } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';
import { Constant } from '../../constants/constant';
import { DialogChangePasswordComponent } from '../dialog-change-password/dialog-change-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  iAutenticacion: IAutenticacion;

  usuario: string = '';
  contrasena: string = '';

  constructor(public message: Message, public service: ServiceService, private router: Router, public shared: Shared, public constant: Constant, public dialog: MatDialog) { }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iAutenticacion = { usuario: '', contrasena: '' };
        break;
      }
      case 2: {
        this.shared.idUsuario = 0;
        this.shared.usuario = '';
        this.shared.nombreUsuario = '';
        this.shared.idRol = 0;
        this.shared.cambiaContrasena = false;
        break;
      }
    }

  }

  ngModel(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iAutenticacion.usuario = this.usuario;
        this.iAutenticacion.contrasena = this.contrasena;
        break;
      }
      case 2: {
        this.shared.idUsuario = data['id'];
        this.shared.usuario = data['usuario'];
        this.shared.nombreUsuario = data['nombreUsuario'];
        this.shared.idRol = data['idRol'];
        this.shared.cambiaContrasena = data['cambiaContrasena'];
        window.localStorage.setItem('token', data['token']);
        this.shared.complete = true;
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.ngClean(2);
        this.ngModel(1);
        this.ngPostToken(this.iAutenticacion);
        break;
      }
      case 2: {
        this.ngValidate(2);
        break;
      }
    }

  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {

        if (this.shared.cambiaContrasena) {
          this.ngController(2);
        } else {
          this.ngDialogCambiaContrasena();
        }

        break;
      }
      case 2: {

        this.router.navigate(['main/home']);

        break;
      }
    }

    return b;
  }

  ngDialogCambiaContrasena(): void {

    this.dialog.open(DialogChangePasswordComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { 'idUsuario': this.shared.idUsuario, 'usuario': this.usuario, 'contrasena': this.contrasena }
    }).beforeClosed().subscribe(
      (r: boolean) => {

        if (r == true) {
          this.ngController(2);
        }

      });

  }

  async ngPostToken(model: IAutenticacion) {

    await this.service.ngPostToken(model)
      .then((r: IResponse) => {

        if (r.success) {
          this.ngModel(2, r.data);
          this.ngValidate(1);
        }
        else {
          this.message.dialogMessage('Usuario y/o Contraseña incorrectos');
        }

      }).catch(
        (e: any) => {
          this.message.dialogMessage(this.shared.ngError(e));
        }
      ).finally(() => { });

  }

  ngSpecialChar(event: KeyboardEvent) {
    let k: number = 0;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  ngKeyUp(): void {
    if (this.usuario != '' && this.contrasena != '') {
      this.ngController(1);
    }
  }

}
