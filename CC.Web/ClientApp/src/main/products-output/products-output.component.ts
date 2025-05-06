import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { IProductoSalida, IResponse, IViewProductoSalida, IViewRol } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-products-output',
  templateUrl: './products-output.component.html',
  styleUrls: ['./products-output.component.css']
})
export class ProductsOutputComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  iProductoSalida: IProductoSalida;
  inProductoSalida: IProductoSalida[] = [];

  iViewProductoSalida: IViewProductoSalida;
  inViewProductoSalida: IViewProductoSalida[] = [];

  ds = new MatTableDataSource<IViewProductoSalida>();
  fl: string[] = ['editar-se', 'producto-se', 'cantidadEntrada-se', 'cantidadSalida-se', 'cantidad-se', 'fecha-se', 'guardar-se'];
  dc: string[] = ['editar', 'producto', 'cantidadEntrada', 'cantidadSalida', 'cantidad', 'fecha', 'guardar'];
  se = { 'producto': '', 'cantidadEntrada': [], 'cantidadSalida': [], 'cantidad': '', 'fecha': [] };
  search: string = '';

  fcProducto = new FormControl();
  fcCantidadEntrada = new FormControl();
  fcCantidadSalida = new FormControl();
  fcCantidad = new FormControl();
  fcFecha = new FormControl();

  dsCantidadEntrada: any = [];
  dsCantidadSalida: any = [];
  dsFecha: any = [];

  constructor(public shared: Shared, public message: Message, public dialog: MatDialog, public service: ServiceService) {
    this.ngController(1);
  }

  ngOnInit(): void {
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iProductoSalida = { id: 0, idProducto: 0, cantidad: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 2: {
        this.inProductoSalida = [];
        break;
      }
      case 3: {
        this.iViewProductoSalida = { idProducto: 0, producto: '', cantidadEntrada: 0, cantidadSalida: 0, cantidad: 0, fecha: '', activo: true };
        break;
      }
      case 4: {
        this.inViewProductoSalida = [];
        break;
      }
      case 5: {
        this.fcProducto.reset('');
        this.fcCantidadEntrada.reset('');
        this.fcCantidadSalida.reset('');
        this.fcCantidad.reset('');
        this.fcFecha.reset('');
        break;
      }
      case 6: {
        this.search = '';
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
      case 2: {
        this.ngClean(1);
        const model: IViewProductoSalida = data as IViewProductoSalida;
        this.iProductoSalida.idProducto = model.idProducto;
        this.iProductoSalida.cantidad = model.cantidad;
        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngModelSet(1);
        this.ngGetViewProductoSalida(1, this.iViewProductoSalida);
        break;
      }
      case 2: {
        this.ngModelSet(2, data);
        this.ngPostProductoSalida(this.iProductoSalida);
        break;
      }
    }

  }

  ngValidate(option: number, data?: any): boolean {
    let b: boolean = true;

    switch (option) {
      case 1: {
        if (data['cantidad'] > (data['cantidadEntrada'] - data['cantidadSalida'])) {
          this.message.dialogMessage('No es posible agregar cantidades mayores al del inventario.');
          data['cantidad'] = 0;
          b = false;
        }
        break;
      }
    }

    return b;
  }

  async ngGetViewProductoSalida(option: number, model: IViewProductoSalida) {

    await this.service.ngGetViewProductoSalida(option, model)
      .then((r: IResponse) => {

        if (r.success == true) {
          this.inViewProductoSalida = r.data;
          this.ngDataSource(1);
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

  async ngPostProductoSalida(model: IProductoSalida) {

    await this.service.ngPostProductoSalida(model)
      .then((r: IResponse) => {

        if (r.success) {
          this.ngController(1);
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

  ngDataSource(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ds = new MatTableDataSource<IViewProductoSalida>(this.inViewProductoSalida);
        this.ds.sort = this.ms;
        this.ds.paginator = this.mp;

        if (!this.shared.rd) {
          this.ngSearch(1);
          this.ngFilter(1);
        }
        else {
          this.ngSearch(2);
        }

        break;
      }
    }

  }

  ngSearch(option: number, data?: any): void {

    switch (option) {
      case 1: {

        this.fcProducto.valueChanges.subscribe((r) => {
          this.se['producto'] = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcCantidadEntrada.valueChanges.subscribe((r) => {
          this.se['cantidadEntrada'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcCantidadSalida.valueChanges.subscribe((r) => {
          this.se['cantidadSalida'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcCantidad.valueChanges.subscribe((r) => {
          this.se['cantidad'] = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcFecha.valueChanges.subscribe((r) => {
          this.se['fecha'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.ds.filterPredicate = this.ngFilterPredicate(1);

        break;
      }
      case 2: {

        this.ds.filter = this.search;

        break;
      }
    }

  }

  ngFilter(option: number, data?: any): void {

    switch (option) {
      case 1: {

        this.dsCantidadEntrada = this.ngFilterObject(this.inViewProductoSalida, 'cantidadEntrada');
        this.dsCantidadSalida = this.ngFilterObject(this.inViewProductoSalida, 'cantidadSalida');
        this.dsFecha = this.ngFilterObject(this.inViewProductoSalida, 'fecha');

        break;
      }
    }

  }

  ngFilterObject(model: any, key: string) {
    return this.shared.ngFilterObject(model, key);
  }

  ngFilterPredicate(option: number, data?: any) {

    let filterPredicate: any;

    switch (option) {
      case 1: {
        filterPredicate = function (data: IViewRol, filter: string): boolean {

          const searchTerms: Partial<Record<keyof IViewRol, string>> = JSON.parse(filter);

          searchTerms.activo = (searchTerms.activo == 'activo' ? 'true' : searchTerms.activo);
          searchTerms.activo = (searchTerms.activo == 'inactivo' ? 'false' : searchTerms.activo);
          searchTerms.activo = (searchTerms.activo?.includes(',') ? '' : searchTerms.activo);

          if (searchTerms === null || searchTerms === undefined) {
            return true;
          }

          return Object.keys(searchTerms).every((key) => {
            if (Array.isArray(searchTerms[key])) {
              return searchTerms[key]?.length > 0
                ? searchTerms[key].some((term: string) =>
                  Array.isArray(data[key])
                    ? data[key].includes(term)
                    : data[key] === term
                )
                : true;
            }

            return (data[key]?.toString().toLowerCase()?.indexOf(searchTerms[key]?.toLowerCase()) !== -1);

          });

        }
        break;
      }
    }

    return filterPredicate;
  }

  ngExport(option: number) {

    switch (option) {
      case 1: {

        let filteredData: any[] = [];

        filteredData = this.ds.filteredData.map(v => ({
          'Producto': v.producto, 'Cantidad Entrada': v.cantidadEntrada, 'Cantidad Salida': v.cantidadSalida, 'Cantidad': v.cantidad, 'Fecha': v.fecha, 'Estatus': (v.activo == true ? 'Activo' : 'Inactivo')
        }));

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('Productos_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
