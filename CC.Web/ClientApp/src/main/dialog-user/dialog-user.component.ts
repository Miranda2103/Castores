import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse, IRol, IUsuario } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  close: boolean = false;
  input: String = '';

  iUsuario: IUsuario;
  inUsuario: IUsuario[] = [];

  iRol: IRol;
  inRol: IRol[] = [];
  filteredRol: IRol[] = [];

  constructor(private cdr: ChangeDetectorRef, public shared: Shared, public dialog: MatDialogRef<DialogUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.iUsuario = data['model'];
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.ngInput();

    if (this.iUsuario.id == 0) {
      this.ngResetPassword();
    }

    this.ngController(1);
    this.cdr.detectChanges();
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iUsuario = { id: 0, usuario: '', contrasena: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', nombreCompleto: '', cambiaContrasena: false, idRol: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 2: {
        this.inUsuario = [];
        break;
      }
      case 3: {
        this.iRol = { id: 0, rol: '', idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 4: {
        this.inRol = [];
        this.filteredRol = [];
        break;
      }
      case 5: {
        this.iUsuario.usuario = '';
        break;
      }
      case 6: {
        this.iUsuario.contrasena = '';
        break;
      }
      case 7: {
        this.iUsuario.nombre = '';
        break;
      }
      case 8: {
        this.iUsuario.apellidoPaterno = '';
        break;
      }
      case 9: {
        this.iUsuario.apellidoMaterno = '';
        break;
      }
      case 10: {
        this.iUsuario.idRol = 0;
        let event: MouseEvent = data;
        event.stopPropagation();
        break;
      }
      case 11: {
        if (this.iUsuario.id == 0) {
          this.iUsuario.usuario = '';
        }
        this.iUsuario.nombre = '';
        this.iUsuario.apellidoPaterno = '';
        this.iUsuario.apellidoMaterno = '';
        this.iUsuario.idRol = 0;
        break;
      }
    }

  }

  ngModelSet(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(3);
        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngModelSet(1);
        this.ngGetRol(1, this.iRol);
        break;
      }
      case 2: {

        if (this.iUsuario.id == 0) {
          this.ngGetUsuario(3, this.iUsuario);
        }

        break;
      }
      case 3: {

        if (this.iUsuario.id == 0) {
          this.ngPostUsuario(this.iUsuario);
        }
        else {
          this.ngPutUsuario(1, this.iUsuario);
        }

        break;
      }
    }

  }

  ngModelGet(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(4);
        const model: IRol[] = data as IRol[];
        this.inRol = model;
        this.filteredRol = this.inRol;
        break;
      }
      case 2: {
        this.ngClean(2);
        const model: IUsuario[] = data as IUsuario[];
        this.inUsuario = model;
        break;
      }
      case 3: {
        const model: number = data as number;
        this.iUsuario.id = model;
        break;
      }
    }
  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {

        if (this.inUsuario.length) {
          this.message.dialogMessage('No es posible agregar el usuario ' + this.iUsuario.usuario + ' debido a que ya se encuentra agregado, intenta con uno diferente.');
          this.ngClean(5);
          b = false;
        }

        break;
      }
    }

    return b;
  }

  async ngGetRol(option: number, model: IRol) {

    await this.service.ngGetRol(option, model)
      .then((r: IResponse) => {

        if (r.success) {
          this.ngModelGet(1, r.data);
          this.ngController(2);
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

  async ngGetUsuario(option: number, model: IUsuario) {

    await this.service.ngGetUsuario(option, model)
      .then((r: IResponse) => {

        if (r.success) {
          this.ngModelGet(2, r.data);
          this.ngValidate(1);
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

  async ngPostUsuario(model: IUsuario) {

    await this.service.ngPostUsuario(model)
      .then((r: IResponse) => {

        if (r.success) {
          this.ngModelGet(3, r.data);
          this.dialog.close(this.close);
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

  async ngPutUsuario(option: number, model: IUsuario) {

    await this.service.ngPutUsuario(option, model)
      .then((r: IResponse) => {

        if (r.success) {
          this.dialog.close(this.close);
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

  ngResetPassword() {
    this.iUsuario.contrasena = Math.random().toString(36).slice(-8);
    this.input = 'text';
  }

  ngInput(): void {
    this.input = (this.iUsuario.id == 0 ? 'text' : 'password');
  }

}
