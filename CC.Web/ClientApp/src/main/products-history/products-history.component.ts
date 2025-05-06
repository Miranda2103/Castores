import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { IResponse, IViewProductoHistorial } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-products-history',
  templateUrl: './products-history.component.html',
  styleUrls: ['./products-history.component.css']
})
export class ProductsHistoryComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  iViewProductoHistorial: IViewProductoHistorial;
  inViewProductoHistorial: IViewProductoHistorial[] = [];

  ds = new MatTableDataSource<IViewProductoHistorial>();
  fl: string[] = ['editar-se', 'producto-se', 'cantidad-se', 'usuario-se', 'fecha-se', 'hora-se', 'tipo-se'];
  dc: string[] = ['editar', 'producto', 'cantidad', 'usuario', 'fecha', 'hora', 'tipo'];
  se = { 'producto': '', 'cantidad': '', 'usuario': [], 'fecha': [], 'hora': [], 'tipo': [] };
  search: string = '';

  fcProducto = new FormControl();
  fcCantidad = new FormControl();
  fcUsuario = new FormControl();
  fcFecha = new FormControl();
  fcHora = new FormControl();
  fcTipo = new FormControl();

  dsUsuario: any = [];
  dsFecha: any = [];
  dsHora: any = [];
  dsTipo: any = [];

  constructor(public shared: Shared, public message: Message, public dialog: MatDialog, public service: ServiceService) {
    this.ngController(1);
  }

  ngOnInit(): void {
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iViewProductoHistorial = { producto: '', cantidad: 0, usuario: '', fecha: '', hora: '', tipo: '', activo: true };
        break;
      }
      case 2: {
        this.inViewProductoHistorial = [];
        break;
      }
      case 5: {
        this.fcProducto.reset('');
        this.fcCantidad.reset('');
        this.fcUsuario.reset('');
        this.fcFecha.reset('');
        this.fcHora.reset('');
        this.fcTipo.reset('');
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
        this.ngClean(1);
        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngModelSet(1);
        this.ngGetViewProductoHistorial(1, this.iViewProductoHistorial);
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

  async ngGetViewProductoHistorial(option: number, model: IViewProductoHistorial) {

    await this.service.ngGetViewProductoHistorial(option, model)
      .then((r: IResponse) => {

        if (r.success == true) {
          this.inViewProductoHistorial = r.data;
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

  ngDataSource(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ds = new MatTableDataSource<IViewProductoHistorial>(this.inViewProductoHistorial);
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
          this.se['cantidad'] = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcUsuario.valueChanges.subscribe((r) => {
          this.se['usuario'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcFecha.valueChanges.subscribe((r) => {
          this.se['fecha'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcHora.valueChanges.subscribe((r) => {
          this.se['hora'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcTipo.valueChanges.subscribe((r) => {
          this.se['tipo'] = r;
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

        this.dsUsuario = this.ngFilterObject(this.inViewProductoHistorial, 'usuario');
        this.dsFecha = this.ngFilterObject(this.inViewProductoHistorial, 'fecha');
        this.dsHora = this.ngFilterObject(this.inViewProductoHistorial, 'hora');
        this.dsTipo = this.ngFilterObject(this.inViewProductoHistorial, 'tipo');

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
        filterPredicate = function (data: IViewProductoHistorial, filter: string): boolean {

          const searchTerms: Partial<Record<keyof IViewProductoHistorial, string>> = JSON.parse(filter);

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
          'Producto': v.producto, 'Cantidad': v.cantidad, 'Usuario': v.usuario, 'Fecha': v.fecha, 'Hora': v.hora, 'Tipo': v.tipo
        }));

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('Historial_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
