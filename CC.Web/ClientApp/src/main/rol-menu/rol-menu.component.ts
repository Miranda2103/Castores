import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Shared } from '../../shared/shared';
import { Message } from '../../message/message';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { IRol, IRolMenu, IViewMenu } from '../../interface/interface.interface';
import { ServiceService } from '../../service/service.service';
import * as XLSX from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogMenuComponent } from '../dialog-menu/dialog-menu.component';
import { DialogRolSubMenuComponent } from '../dialog-rol-submenu/dialog-rol-submenu.component';

@Component({
  selector: 'app-rol-menu',
  templateUrl: './rol-menu.component.html',
  styleUrls: ['./rol-menu.component.css']
})
export class RolMenuComponent implements OnInit {

  iRol: IRol;
  inRol: IRol[] = [];
  idRol: number = 0;
  filteredRol: IRol[] = [];

  iViewMenu: IViewMenu;
  inViewMenu: IViewMenu[] = [];

  iRolMenu: IRolMenu;
  inRolMenu: IRolMenu[] = [];

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  ds = new MatTableDataSource<IViewMenu>();
  fl: string[] = ['editar-se', 'menu-se', 'icono-se', 'orden-se', 'estatus-se', 'submenu-se'];
  dc: string[] = ['editar', 'menu', 'icono', 'orden', 'estatus', 'submenu'];
  se = { 'menu': [], 'icono': '', 'orden': [], 'estatus': '' };
  search: string = '';
  selection = new SelectionModel<IViewMenu>(true, []);

  fcMenu = new FormControl();
  fcIcono = new FormControl();
  fcOrden = new FormControl();
  fcEstatus = new FormControl();

  dsMenu: any = [];
  dsOrden: any = [];
  dsEstatus: any = [];

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
        this.iViewMenu = { idMenu: 0, menu: '', ruta: '', icono: '', orden: 0, estatus: false, fecha: '', activo: true };
        break;
      }
      case 3: {
        this.iRolMenu = { id: 0, idRol: 0, idMenu: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 4: {
        this.selection = new SelectionModel<IViewMenu>(true, []);
        break;
      }
      case 5: {
        this.fcMenu.reset('');
        this.fcIcono.reset('');
        this.fcOrden.reset('');
        this.fcEstatus.reset('');
        break;
      }
      case 6: {
        this.search = '';
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.ngGetRol(1, this.iRol);
        break;
      }
      case 2: {
        this.ngClean(2);
        this.ngClean(3);
        this.ngClean(4);
        this.ngClean(5);
        this.ngClean(6);
        this.ngGetViewMenu(1, this.iViewMenu);
        break;
      }
      case 3: {
        this.ngClean(3);
        this.iRolMenu.idRol = this.idRol;
        this.ngGetRolMenu(1, this.iRolMenu);
        break;
      }
      case 4: {
        let inRolMenu: IRolMenu[] = [];

        this.inViewMenu.forEach((v, i) => {
          if (v['estatus'] == true) {
            inRolMenu.push({ id: 0, idRol: this.idRol, idMenu: v['idMenu'], idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true });
          }
        });

        this.ngPostRolMenu(inRolMenu);
        break;
      }
      case 5: {
        this.ngClean(3);
        this.iRolMenu.idRol = this.idRol;
        this.ngDeleteRolMenu(this.iRolMenu);
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

  ngDialogMenu(model: IViewMenu): void {

    this.dialog.open(DialogMenuComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { idRol: this.idRol, model: model }
    }).beforeClosed().subscribe(
      (r) => {

        if (r == true) {
          this.ngController(3);
        }

      });

  }

  ngDialogRolSubMenu(model: IViewMenu): void {

    this.dialog.open(DialogRolSubMenuComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { idRol: this.idRol, model: model }
    }).beforeClosed().subscribe(
      (r) => {

        if (r == true) {
          this.ngController(3);
        }

      });

  }

  async ngGetRol(option: number, model: IRol) {

    await this.service.ngGetRol(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inRol = r['data'];
          this.filteredRol = this.inRol;
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

  async ngGetRolMenu(option: number, model: IRolMenu) {

    await this.service.ngGetRolMenu(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inRolMenu = r['data'];
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

  async ngGetViewMenu(option: number, model: IViewMenu) {

    await this.service.ngGetViewMenu(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inViewMenu = r['data'];

          this.inViewMenu.forEach((v, i) => {

            let inRolMenu: IRolMenu[] = [];
            inRolMenu = this.inRolMenu.filter(r => r['idMenu'] == v['idMenu']);

            if (inRolMenu.length >= 1) {
              v['estatus'] = true;
            }

          });

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

  async ngPostRolMenu(model: IRolMenu[]) {

    await this.service.ngPostRolMenu(model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.ngController(3);
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

  async ngDeleteRolMenu(model: IRolMenu) {

    await this.service.ngDeleteRolMenu(model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.ngController(4);
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
        this.ds = new MatTableDataSource<IViewMenu>(this.inViewMenu);
        this.ds.sort = this.ms;
        this.ds.paginator = this.mp;

        if (!this.shared.rd) {
          this.ngSearch(1);
          this.ngFilter(1);
        }
        else {
          this.ngSearch(2);
        }

        this.ngSetSelection();
        break;
      }
    }

  }

  ngSearch(option: number, data?: any): void {

    switch (option) {
      case 1: {

        this.fcMenu.valueChanges.subscribe((r) => {
          this.se['menu'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcIcono.valueChanges.subscribe((r) => {
          this.se['icono'] = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcOrden.valueChanges.subscribe((r) => {
          this.se['orden'] = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcEstatus.valueChanges.subscribe((r) => {
          this.se['estatus'] = r.toString().toLowerCase().trim();
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

        this.dsMenu = this.ngFilterObject(this.inViewMenu, 'menu');
        this.dsOrden = this.ngFilterObject(this.inViewMenu, 'orden');
        this.dsEstatus = this.ngFilterObject(this.inViewMenu, 'estatus');

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

        filterPredicate = function (data: IViewMenu, filter: string): boolean {

          const searchTerms: Partial<Record<keyof IViewMenu, string>> = JSON.parse(filter);

          searchTerms['estatus'] = (searchTerms['estatus'] == 'activo' ? 'true' : searchTerms['estatus']);
          searchTerms['estatus'] = (searchTerms['estatus'] == 'inactivo' ? 'false' : searchTerms['estatus']);

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
    const numRows = this.inViewMenu.length;
    return numSelected === numRows;
  }

  ngMasterToggle() {
    (this.ngIsAllSelected() ? this.selection.clear() : this.inViewMenu.forEach(row => this.selection.select(row)));

    if (this.ngIsAllSelected() == true) {
      this.inViewMenu.forEach((v, i) => {
        v['estatus'] = true;
      });
    } else {
      this.inViewMenu.forEach((v, i) => {
        v['estatus'] = false;
      });
    }

  }

  ngSetSelection() {
    this.ngClean(4);

    this.inViewMenu.forEach((v, i) => {
      if (v['estatus'] == true) {
        this.selection.select(v);
      }
    });
  }

  ngUpdateSelection(model: IViewMenu) {
    let idx: number = this.inViewMenu.findIndex(r => r['idMenu'] == model['idMenu']);

    this.inViewMenu.forEach((v, i) => {
      if (i == idx) {
        v['estatus'] = !model['estatus'];
      }
    });
  }

  ngExport(option: number) {

    switch (option) {
      case 1: {

        let filteredData: any[] = [];

        this.ds.filteredData.forEach((v, i) => {
          filteredData.push({ 'Menu': v['menu'], 'Icono': v['icono'], 'Orden': v['orden'], 'Fecha': v['fecha'] })
        });

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('RolesMenu_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
