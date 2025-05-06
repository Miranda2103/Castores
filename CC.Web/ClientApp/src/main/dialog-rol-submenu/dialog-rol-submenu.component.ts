import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Shared } from '../../shared/shared';
import { Message } from '../../message/message';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { IRol, IRolSubMenu, IViewMenu, IViewSubMenu } from '../../interface/interface.interface';
import { ServiceService } from '../../service/service.service';
import * as XLSX from 'xlsx';
import { SelectionModel } from '@angular/cdk/collections';
import { DialogSubMenuComponent } from '../dialog-submenu/dialog-submenu.component';

@Component({
  selector: 'app-dialog-rol-submenu',
  templateUrl: './dialog-rol-submenu.component.html',
  styleUrls: ['./dialog-rol-submenu.component.css']
})
export class DialogRolSubMenuComponent implements OnInit {

  iRol: IRol;
  inRol: IRol[] = [];
  idRol: number = 0;
  filteredRol: IRol[] = [];

  iViewMenu: IViewMenu;

  iViewSubMenu: IViewSubMenu;
  inViewSubMenu: IViewSubMenu[] = [];

  iRolSubMenu: IRolSubMenu;
  inRolSubMenu: IRolSubMenu[] = [];

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  ds = new MatTableDataSource<IViewSubMenu>();
  fl: string[] = ['editar-se', 'menu-se', 'subMenu-se', 'orden-se', 'estatus-se'];
  dc: string[] = ['editar', 'menu', 'subMenu', 'orden', 'estatus'];
  se = { 'menu': [], 'subMenu': [], 'icono': '', 'orden': [], 'estatus': '' };
  search: string = '';
  selection = new SelectionModel<IViewSubMenu>(true, []);

  fcMenu = new FormControl();
  fcSubMenu = new FormControl();
  fcOrden = new FormControl();
  fcEstatus = new FormControl();

  dsMenu: any = [];
  dsSubMenu: any = [];
  dsOrden: any = [];
  dsEstatus: any = [];

  constructor(public shared: Shared, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, protected service: ServiceService, public message: Message) {
    this.idRol = data['idRol'];
    this.iViewMenu = data['model'];
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
        this.iViewSubMenu = { idMenu: 0, menu: '', idSubMenu: 0, subMenu: '', ruta: '', icono: '', orden: 0, estatus: false, fecha: '', activo: true };
        break;
      }
      case 3: {
        this.iRolSubMenu = { id: 0, idRol: 0, idMenu: 0, idSubMenu: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true };
        break;
      }
      case 4: {
        this.selection = new SelectionModel<IViewSubMenu>(true, []);
        break;
      }
      case 5: {
        this.fcMenu.reset('');
        this.fcSubMenu.reset('');
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
        this.iViewSubMenu.idMenu = this.iViewMenu.idMenu;
        this.ngGetViewSubMenu(1, this.iViewSubMenu);
        break;
      }
      case 3: {
        this.ngClean(3);
        this.iRolSubMenu.idRol = this.idRol;
        this.iRolSubMenu.idMenu = this.iViewMenu.idMenu;
        this.ngGetRolSubMenu(1, this.iRolSubMenu);
        break;
      }
      case 4: {
        let inRolSubMenu: IRolSubMenu[] = [];

        this.inViewSubMenu.forEach((v, i) => {
          if (v['estatus'] == true) {
            inRolSubMenu.push({ id: 0, idRol: this.idRol, idMenu: this.iViewMenu.idMenu, idSubMenu: v['idSubMenu'], idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: true });
          }
        });

        this.ngPostRolSubMenu(inRolSubMenu);
        break;
      }
      case 5: {
        this.ngClean(3);
        this.iRolSubMenu.idRol = this.idRol;
        this.iRolSubMenu.idMenu = this.iViewMenu.idMenu;
        this.ngDeleteRolSubMenu(this.iRolSubMenu);
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

  ngDialogSubMenu(model: IViewSubMenu): void {

    this.dialog.open(DialogSubMenuComponent, {
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

  async ngGetRolSubMenu(option: number, model: IRolSubMenu) {

    await this.service.ngGetRolSubMenu(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inRolSubMenu = r['data'];
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

  async ngGetViewSubMenu(option: number, model: IViewSubMenu) {

    await this.service.ngGetViewSubMenu(option, model)
      .then((r: any) => {

        if (r['success'] == true) {
          this.inViewSubMenu = r['data'];

          this.inViewSubMenu.forEach((v, i) => {

            let inRolSubMenu: IRolSubMenu[] = [];
            inRolSubMenu = this.inRolSubMenu.filter(r => r['idSubMenu'] == v['idSubMenu']);

            if (inRolSubMenu.length >= 1) {
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

  async ngPostRolSubMenu(model: IRolSubMenu[]) {

    await this.service.ngPostRolSubMenu(model)
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

  async ngDeleteRolSubMenu(model: IRolSubMenu) {

    await this.service.ngDeleteRolSubMenu(model)
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
        this.ds = new MatTableDataSource<IViewSubMenu>(this.inViewSubMenu);
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

        this.fcSubMenu.valueChanges.subscribe((r) => {
          this.se['subMenu'] = r;
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

        this.dsMenu = this.ngFilterObject(this.inViewSubMenu, 'menu');
        this.dsSubMenu = this.ngFilterObject(this.inViewSubMenu, 'subMenu');
        this.dsOrden = this.ngFilterObject(this.inViewSubMenu, 'orden');
        this.dsEstatus = this.ngFilterObject(this.inViewSubMenu, 'estatus');

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
        filterPredicate = function (data: IViewSubMenu, filter: string): boolean {

          const searchTerms: Partial<Record<keyof IViewSubMenu, string>> = JSON.parse(filter);

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
    const numRows = this.inViewSubMenu.length;
    return numSelected === numRows;
  }

  ngMasterToggle() {
    (this.ngIsAllSelected() ? this.selection.clear() : this.inViewSubMenu.forEach(row => this.selection.select(row)));

    if (this.ngIsAllSelected() == true) {
      this.inViewSubMenu.forEach((v, i) => {
        v['estatus'] = true;
      });
    } else {
      this.inViewSubMenu.forEach((v, i) => {
        v['estatus'] = false;
      });
    }

  }

  ngSetSelection() {
    this.ngClean(4);

    this.inViewSubMenu.forEach((v, i) => {
      if (v['estatus'] == true) {
        this.selection.select(v);
      }
    });
  }

  ngUpdateSelection(model: IViewSubMenu) {
    let idx: number = this.inViewSubMenu.findIndex(r => r['idSubMenu'] == model['idSubMenu']);

    this.inViewSubMenu.forEach((v, i) => {
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
          filteredData.push({ 'SubMenu': v['subMenu'], 'Orden': v['orden'], 'Fecha': v['fecha'] })
        });

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('RolesSubMenu_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
