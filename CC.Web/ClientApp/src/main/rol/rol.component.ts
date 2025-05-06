import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Shared } from '../../shared/shared';
import { Message } from '../../message/message';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { IRol, IViewRol } from '../../interface/interface.interface';
import { ServiceService } from '../../service/service.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogConfirmationComponent } from '../../dialog-confirmation/dialog-confirmation.component';
import * as XLSX from 'xlsx';
import { DialogRolComponent } from '../dialog-rol/dialog-rol.component';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  iRol: IRol;
  inRol: IRol[] = [];

  iViewRol: IViewRol;
  inViewRol: IViewRol[] = [];

  ds = new MatTableDataSource<IViewRol>();
  fl: string[] = ['editar-se', 'rol-se', 'fecha-se', 'eliminar-se'];
  dc: string[] = ['editar', 'rol', 'fecha', 'eliminar'];
  se = { 'Rol': [], 'fecha': [] };
  search: string = '';
  selection = new SelectionModel<IViewRol>(true, []);

  fcRol = new FormControl();
  fcFecha = new FormControl();

  dsRol: any = [];
  dsFecha: any = [];

  constructor(public shared: Shared, public message: Message, public dialog: MatDialog, public service: ServiceService) {
    this.ngController(1);
  }

  ngOnInit(): void {
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iRol = { id: 0, rol: '', idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 2: {
        this.iViewRol = { idRol: 0, rol: '', fecha: '', activo: true };
        break;
      }
      case 3: {
        this.selection = new SelectionModel<IViewRol>(true, []);
        break;
      }
      case 4: {
        this.fcRol.reset('');
        this.fcFecha.reset('');
        break;
      }
      case 5: {
        this.search = '';
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.ngClean(2);
        this.ngClean(3);
        this.ngClean(4);
        this.ngClean(5);
        this.ngGetViewRol(1, this.iViewRol);
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

  ngDialogRol(option: number, model?: IViewRol): void {

    this.dialog.open(DialogRolComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { option: option, model: model }
    }).beforeClosed().subscribe(
      (r) => {

        if (r == true) {
          this.ngController(1);
        }

      });

  }

  ngDialogConfirmacion(option: number): void {

    let message: string = '';

    switch (option) {
      case 1: {
        message = '¿Estas seguro que quieres eliminar ' + this.selection.selected.length + ' registro(s)?';
        break;
      }
    }

    this.dialog.open(DialogConfirmationComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { message: message }
    }).beforeClosed().subscribe(
      (r) => {

        if (r == true) {

          switch (option) {
            case 1: {
              this.ngDeleteRol(this.selection.selected);
              break;
            }
          }

        }

      });

  }

  async ngGetViewRol(option: number, model: IViewRol) {

    await this.service.ngGetViewRol(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inViewRol = r['data'];
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

  async ngDeleteRol(model: IViewRol[]) {

    let inRol: IRol[] = [];

    model.forEach((v, i) => {
      inRol.push({ id: v['idRol'], rol: v['rol'], idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaDefault(), activo: false });
    });

    await this.service.ngDeleteRol(inRol)
      .then(async (r: any) => {

        if (r['success'] == true) {
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
        this.ds = new MatTableDataSource<IViewRol>(this.inViewRol);
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

        this.fcRol.valueChanges.subscribe((r) => {
          this.se['rol'] = r;
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

        this.dsRol = this.ngFilterObject(this.inViewRol, 'rol');
        this.dsFecha = this.ngFilterObject(this.inViewRol, 'fecha');

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

  ngIsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inViewRol.length;
    return numSelected === numRows;
  }

  ngMasterToggle() {
    (this.ngIsAllSelected() ? this.selection.clear() : this.inViewRol.forEach(row => this.selection.select(row)));
  }

  ngExport(option: number) {

    switch (option) {
      case 1: {

        let filteredData: any[] = [];

        this.ds.filteredData.forEach((v, i) => {
          filteredData.push({ 'Rol': v['rol'], 'Fecha': v['fecha'] })
        });

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('Rol_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
