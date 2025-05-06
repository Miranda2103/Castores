import { BehaviorSubject } from "rxjs";
import { IExtensionDescarga } from "../interface/interface.interface";


export class Shared {

  public complete: boolean = false;
  public rd: boolean = false;
  public screen: number = 600;
  public expand: boolean = true;

  public load: boolean = false;
  public loading: boolean = false;
  public isLoading = new BehaviorSubject(false);

  public idUsuario: number = 0;
  public usuario: string = '';
  public nombreUsuario: string = '';
  public idRol: number = 0;
  public cambiaContrasena: boolean = false;

  public extension: string = '.csv';
  public format: string = '.xlsx';

  public inExtensionDescarga: IExtensionDescarga[] = [];

  public error: string = 'Ha ocurrido un error al intentar ejecutar la solicitud, informe al administrador.' + '<br/><br/ > ' + 'Error: ';
  public message: any = [];

  constructor() {
    this.ngExtensionDescarga();
  }

  ngFechaInserta() {
    return new Date(new Date().setHours(new Date().getHours() - 6)).toISOString();
  }

  ngFechaActualiza() {
    return new Date(new Date().setHours(new Date().getHours() - 6)).toISOString();
  }

  ngFechaDefault() {
    return '1900-01-01T00:00:00';
  }

  ngError(e: any) {
    return this.error + (e['error'] == null ? e['message'] : (e['error']['message'] == null ? e['error']['title'] : e['error']['message']));
  }

  ngFalse() {
    return this.error + 'False';
  }

  ngFilterObject(model: any, key: string) {
    const uniq = [];
    let uniqOrder = [];
    let type: string = '';

    model.filter(obj => {

      if (!uniq.includes(obj[key])) {
        uniq.push(obj[key]);
        type = typeof obj[key];
      }

      return obj;
    });

    if (type == 'number') {
      uniqOrder = uniq.sort((n1, n2) => n1 - n2);
    }
    else if (type == 'string') {

      uniqOrder = uniq.sort((n1, n2) => {

        if (n1 > n2) {
          return 1;
        }

        if (n1 < n2) {
          return -1;
        }

        return 0;
      });

    }
    else if (type == 'boolean') {

      let data: any[] = [];

      for (let item of uniq) {

        if (item == true) {
          data.push('Activo');
        } else {
          data.push('Inactivo');
        }

      }

      uniqOrder = data.sort((n1, n2) => {

        if (n1 > n2) {
          return 1;
        }

        if (n1 < n2) {
          return -1;
        }

        return 0;
      });

    }
    else {
      uniqOrder = uniq;
    }

    return uniqOrder;

  }

  ngExportDate() {
    let d = new Date();
    return ('0' + d.getDate()).slice(-2).toString() + ('0' + (d.getMonth() + 1)).slice(-2).toString() + d.getFullYear().toString() + '_' + d.getHours().toString() + d.getMinutes().toString() + d.getSeconds().toString();
  }

  ngNumber(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;

    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    return true;
  }

  ngUUID(): number {
    let uuid: number = 0;
    uuid = Date.now();

    return uuid;
  }

  ngDateFormat(fecha: Date) {
    return (fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate());
  }

  ngDateISO(fecha: Date) {
    return new Date(fecha.getFullYear() + '-' + (fecha.getMonth() + 1) + '-' + fecha.getDate()).toISOString();
  }

  ngExtensionDescarga() {
    this.inExtensionDescarga.push({ id: 1, extension: '.csv' }, { id: 2, extension: '.xlsx' });
  }

  ngDateCurrent() {
    let d = new Date();
    return d.getFullYear().toString() + '-' + ('0' + (d.getMonth() + 1)).slice(-2).toString() + '-' + ('0' + d.getDate()).slice(-2).toString() + ' ' + ('0' + d.getHours()).slice(-2).toString() + ':' + ('0' + d.getMinutes()).slice(-2).toString() + ':' + ('0' + d.getSeconds()).slice(-2).toString();
  }

  ngDateAddDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  ngDateRemoveDays(date: Date, days: number): Date {
    date.setDate(date.getDate() - days);
    return date;
  }

}
