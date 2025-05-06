import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { IProductoEntrada, IResponse } from '../../interface/interface.interface';
import { Shared } from '../../shared/shared';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiceService } from '../../service/service.service';
import { Message } from '../../message/message';

@Component({
  selector: 'app-dialog-products-entry',
  templateUrl: './dialog-products-entry.component.html',
  styleUrls: ['./dialog-products-entry.component.css']
})
export class DialogProductsEntryComponent implements OnInit {

  close: boolean = false;

  iProductoEntrada: IProductoEntrada;
  inProductoEntrada: IProductoEntrada[] = [];

  cantidad: number = 0;

  constructor(private cdr: ChangeDetectorRef, public shared: Shared, public dialog: MatDialogRef<DialogProductsEntryComponent>, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.iProductoEntrada = data['model'];
    this.cantidad = this.iProductoEntrada.cantidad;
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iProductoEntrada = { id: 0, producto: '', cantidad: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 2: {
        this.inProductoEntrada = [];
        break;
      }
      case 3: {
        this.iProductoEntrada.producto = '';
        break;
      }
      case 4: {
        this.iProductoEntrada.cantidad = 0;
        break;
      }
      case 5: {
        this.iProductoEntrada.producto = '';
        this.iProductoEntrada.cantidad = 0;
        break;
      }
    }

  }

  ngModelSet(option: number, data?: any): void {

    switch (option) {
      case 1: {

        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {

        if (this.iProductoEntrada.id == 0) {
          this.ngPostProductoEntrada(this.iProductoEntrada);
        }
        else {
          this.ngPutProductoEntrada(1, this.iProductoEntrada);
        }

        break;
      }
    }

  }

  ngModelGet(option: number, data?: any): void {

    switch (option) {
      case 1: {

        break;
      }
    }
  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {
        if (this.iProductoEntrada.cantidad < this.cantidad) {
          this.message.dialogMessage('No es posible agregar cantidades menores.');
          this.iProductoEntrada.cantidad = this.cantidad;
          b = false;
        }
        break;
      }
    }

    return b;
  }

  async ngPostProductoEntrada(model: IProductoEntrada) {

    await this.service.ngPostProductoEntrada(model)
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

  async ngPutProductoEntrada(option: number, model: IProductoEntrada) {

    await this.service.ngPutProductoEntrada(option, model)
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

}
