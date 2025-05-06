import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { IProductoEntrada, IResponse, IViewProductoEntrada, IViewRol } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';
import { DialogProductsEntryComponent } from '../dialog-products-entry/dialog-products-entry.component';

@Component({
  selector: 'app-products-entry',
  templateUrl: './products-entry.component.html',
  styleUrls: ['./products-entry.component.css']
})
export class ProductsEntryComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  iProductoEntrada: IProductoEntrada;
  inProductoEntrada: IProductoEntrada[] = [];

  iViewProductoEntrada: IViewProductoEntrada;
  inViewProductoEntrada: IViewProductoEntrada[] = [];

  ds = new MatTableDataSource<IViewProductoEntrada>();
  fl: string[] = ['editar-se', 'producto-se', 'cantidad-se', 'fecha-se', 'activo-se'];
  dc: string[] = ['editar', 'producto', 'cantidad', 'fecha', 'activo'];
  se = { 'producto': '', 'cantidad': [], 'fecha': [] };
  search: string = '';
  selection = new SelectionModel<IViewProductoEntrada>(true, []);

  fcProducto = new FormControl();
  fcCantidad = new FormControl();
  fcFecha = new FormControl();

  dsCantidad: any = [];
  dsFecha: any = [];

  constructor(public shared: Shared, public message: Message, public dialog: MatDialog, public service: ServiceService) {
    this.ngController(1);
  }

  ngOnInit(): void {
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
        this.iViewProductoEntrada = { idProducto: 0, producto: '', cantidad: 0, fecha: '', activo: true };
        break;
      }
      case 4: {
        this.inViewProductoEntrada = [];
        break;
      }
      case 5: {
        this.fcProducto.reset('');
        this.fcCantidad.reset('');
        this.fcFecha.reset('');
        break;
      }
      case 6: {
        this.search = '';
        break;
      }
      case 7: {
        this.selection = new SelectionModel<IViewProductoEntrada>(true, []);
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
        break;
      }
      case 3: {
        this.ngClean(1);
        const model: IViewProductoEntrada = data as IViewProductoEntrada;
        this.iProductoEntrada.id = model.idProducto;
        this.iProductoEntrada.producto = model.producto;
        this.iProductoEntrada.cantidad = model.cantidad;
        break;
      }
      case 4: {
        this.ngClean(2);
        this.inProductoEntrada = this.selection.selected.map(v => ({ id: v.idProducto, producto: v.producto, cantidad: v.cantidad, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: !v.activo }));
        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngModelSet(1);
        this.ngGetViewProductoEntrada(1, this.iViewProductoEntrada);
        break;
      }
      case 2: {
        this.ngModelSet(4);
        this.ngDeleteProductoEntrada(1, this.inProductoEntrada);
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

  ngDialogProductoEntrada(option: number, model?: IViewRol): void {

    if (option == 1) {
      this.ngModelSet(2);
    }
    else {
      this.ngModelSet(3, model);
    }

    this.dialog.open(DialogProductsEntryComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { model: this.iProductoEntrada }
    }).beforeClosed().subscribe(
      (r) => {

        if (r == true) {
          this.ngController(1);
        }

      });

  }

  async ngGetViewProductoEntrada(option: number, model: IViewProductoEntrada) {

    await this.service.ngGetViewProductoEntrada(option, model)
      .then((r: IResponse) => {

        if (r.success == true) {
          this.inViewProductoEntrada = r.data;
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

  async ngDeleteProductoEntrada(option: number, model: IProductoEntrada[]) {

    await this.service.ngDeleteProductoEntrada(option, model)
      .then(async (r: IResponse) => {

        if (r.success == true) {
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
        this.ds = new MatTableDataSource<IViewProductoEntrada>(this.inViewProductoEntrada);
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

        this.fcCantidad.valueChanges.subscribe((r) => {
          this.se['cantidad'] = r;
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

        this.dsCantidad = this.ngFilterObject(this.inViewProductoEntrada, 'cantidad');
        this.dsFecha = this.ngFilterObject(this.inViewProductoEntrada, 'fecha');

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
          'Producto': v.producto, 'Cantidad': v.cantidad, 'Fecha': v.fecha, 'Estatus': (v.activo == true ? 'Activo' : 'Inactivo')
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
