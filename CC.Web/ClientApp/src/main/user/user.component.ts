import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import { IResponse, IUsuario, IViewUsuario } from '../../interface/interface.interface';
import { Message } from '../../message/message';
import { ServiceService } from '../../service/service.service';
import { Shared } from '../../shared/shared';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {

  iUsuario: IUsuario;
  inUsuario: IUsuario[] = [];

  iViewUsuario: IViewUsuario;
  inViewUsuario: IViewUsuario[] = [];

  @ViewChild(MatSort, { static: true }) ms!: MatSort;
  @ViewChild(MatPaginator, { static: true }) mp!: MatPaginator;

  ds = new MatTableDataSource<IViewUsuario>();
  fl: string[] = ['editar-se', 'usuario-se', 'nombreCompleto-se', 'rol-se', 'fecha-se', 'activo-se'];
  dc: string[] = ['editar', 'usuario', 'nombreCompleto', 'rol', 'fecha', 'activo'];
  se = { 'usuario': '', 'nombreCompleto': '', 'rol': [], 'tipoCarteras': [], 'carteras': [], 'fecha': [], 'activo': '' };
  search: string = '';
  selection = new SelectionModel<IViewUsuario>(true, []);

  fcUsuario = new FormControl();
  fcNombreCompleto = new FormControl();
  fcRol = new FormControl();
  fcFecha = new FormControl();
  fcActivo = new FormControl();

  dsRol: any = [];
  dsFecha: any = [];
  dsActivo: any = [];

  constructor(private cdr: ChangeDetectorRef, public shared: Shared, public message: Message, public dialog: MatDialog, public service: ServiceService) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
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
        this.iViewUsuario = { idUsuario: 0, usuario: '', contrasena: '', nombre: '', apellidoPaterno: '', apellidoMaterno: '', nombreCompleto: '', idRol: 0, rol: '', fecha: '', activo: true };
        break;
      }
      case 4: {
        this.inViewUsuario = [];
        break;
      }
      case 5: {
        this.selection = new SelectionModel<IViewUsuario>(true, []);
        break;
      }
      case 6: {
        this.fcUsuario.reset('');
        this.fcNombreCompleto.reset('');
        this.fcRol.reset('');
        this.fcFecha.reset('');
        this.fcActivo.reset('');
        break;
      }
      case 7: {
        this.search = '';
        break;
      }
    }

  }

  ngModelSet(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.ngClean(2);
        this.ngClean(3);
        this.ngClean(4);
        this.ngClean(5);
        this.ngClean(6);
        this.ngClean(7);
        break;
      }
      case 2: {
        this.iViewUsuario.idRol = this.shared.idRol;
        break;
      }
      case 3: {
        this.ngClean(1);
        break;
      }
      case 4: {
        this.ngClean(1);
        const model: IViewUsuario = data as IViewUsuario;
        this.iUsuario.id = model.idUsuario;
        this.iUsuario.usuario = model.usuario;
        this.iUsuario.contrasena = model.contrasena;
        this.iUsuario.nombre = model.nombre;
        this.iUsuario.apellidoPaterno = model.apellidoPaterno;
        this.iUsuario.apellidoMaterno = model.apellidoMaterno;
        this.iUsuario.nombreCompleto = model.nombreCompleto;
        this.iUsuario.idRol = model.idRol;
        break;
      }
      case 5: {
        this.ngClean(2);
        this.inUsuario = this.selection.selected.map(v => ({ id: v.idUsuario, usuario: v.usuario, contrasena: v.contrasena, nombre: '', apellidoPaterno: '', apellidoMaterno: '', nombreCompleto: v.nombreCompleto, cambiaContrasena: false, idRol: 0, idUsuarioInserta: this.shared.idUsuario, fechaInserta: this.shared.ngFechaInserta(), idUsuarioActualiza: this.shared.idUsuario, fechaActualiza: this.shared.ngFechaActualiza(), activo: !v.activo }));
        break;
      }
    }
  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngModelSet(1);

        if ([3, 4].includes(this.shared.idRol)) {
          this.ngModelSet(2);
          this.ngGetViewUsuario(4, this.iViewUsuario);
        } else {
          this.ngGetViewUsuario(1, this.iViewUsuario);
        }

        break;
      }
      case 2: {
        this.ngModelSet(5);
        this.ngDeleteUsuario(1, this.inUsuario);
        break;
      }
    }

  }

  ngModelGet(option: number, data?: any): void {

    switch (option) {
      case 1: {
        const model: IViewUsuario[] = data as IViewUsuario[];
        this.inViewUsuario = model;
        this.ngDataSource(1);
        break;
      }
    }
  }

  ngDialogUsuario(option: number, model?: IViewUsuario): void {

    if (option == 1) {
      this.ngModelSet(3);
    }
    else {
      this.ngModelSet(4, model);
    }

    this.dialog.open(DialogUserComponent, {
      panelClass: ['w100', 'h100'],
      autoFocus: false,
      data: { model: this.iUsuario }
    }).beforeClosed().subscribe(
      (r: boolean) => {

        if (r == true) {
          this.ngController(1);
        }

      });

  }

  async ngGetViewUsuario(option: number, model: IViewUsuario) {

    await this.service.ngGetViewUsuario(option, model)
      .then((r: IResponse) => {

        if (r.success == true) {
          this.ngModelGet(1, r.data);
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

  async ngDeleteUsuario(option: number, model: IUsuario[]) {

    await this.service.ngDeleteUsuario(option, model)
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
        this.ds = new MatTableDataSource<IViewUsuario>(this.inViewUsuario);
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

        this.fcUsuario.valueChanges.subscribe((r) => {
          this.se.usuario = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcNombreCompleto.valueChanges.subscribe((r) => {
          this.se.nombreCompleto = r.toString().toLowerCase().trim();
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcRol.valueChanges.subscribe((r) => {
          this.se.rol = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcFecha.valueChanges.subscribe((r) => {
          this.se.fecha = r;
          this.ds.filter = JSON.stringify(this.se);
        });

        this.fcActivo.valueChanges.subscribe((r) => {
          this.se.activo = r.toString().toLowerCase().trim();
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

        this.dsRol = this.ngFilterObject(this.inViewUsuario, 'rol');
        this.dsFecha = this.ngFilterObject(this.inViewUsuario, 'fecha');
        this.dsActivo = this.ngFilterObject(this.inViewUsuario, 'activo');

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
        filterPredicate = function (data: IViewUsuario, filter: string): boolean {

          const searchTerms: Partial<Record<keyof IViewUsuario, string>> = JSON.parse(filter);

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

  ngIsAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.inViewUsuario.length;
    return numSelected === numRows;
  }

  ngMasterToggle() {
    (this.ngIsAllSelected() ? this.selection.clear() : this.inViewUsuario.forEach(row => this.selection.select(row)));
  }

  ngExport(option: number) {

    switch (option) {
      case 1: {
        let filteredData: any[] = [];

        filteredData = this.ds.filteredData.map(v => ({
          'Usuario': v.usuario, 'Nombre': v.nombreCompleto, 'Rol': v.rol, 'Fecha': v.fecha, 'Estatus': (v.activo == true ? 'Activo' : 'Inactivo')
        }));

        var wb = XLSX.utils.book_new();
        var ws1 = XLSX.utils.json_to_sheet(filteredData);

        XLSX.utils.book_append_sheet(wb, ws1, 'Hoja1');
        XLSX.writeFile(wb, ('Usuarios_' + this.shared.ngExportDate() + this.shared.extension));

        break;
      }
    }

  }

}
