import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAutenticacion, IMenu, IProductoEntrada, IProductoSalida, IResponse, IRol, IRolMenu, IRolSubMenu, ISubMenu, IUsuario, IViewMenu, IViewProductoEntrada, IViewProductoHistorial, IViewProductoSalida, IViewRol, IViewRolMenu, IViewRolSubMenu, IViewSubMenu, IViewUsuario } from '../interface/interface.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private serviceUrl: string;

  constructor(public http: HttpClient, @Inject('SERVICE_URL') serviceUrl: string) {
    this.serviceUrl = serviceUrl;
  }

  //#region "GET"

  async ngGetUsuario(option: number, model: IUsuario) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/Usuario/Get', { params: params }).toPromise();
  }

  async ngGetRol(option: number, model: IRol) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/Rol/Get', { 'params': params }).toPromise();
  }

  async ngGetMenu(option: number, model: IMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/Menu/Get', { params: params }).toPromise();
  }

  async ngGetRolMenu(option: number, model: IRolMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/RolMenu/Get', { 'params': params }).toPromise();
  }

  async ngGetSubMenu(option: number, model: ISubMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/SubMenu/Get', { params: params }).toPromise();
  }

  async ngGetRolSubMenu(option: number, model: IRolSubMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/RolSubMenu/Get', { 'params': params }).toPromise();
  }

  //#endregion "GET"


  //#region "VIEW"

  async ngGetViewUsuario(option: number, model: IViewUsuario) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewUsuario', { params: params }).toPromise();
  }

  async ngGetViewRol(option: number, model: IViewRol) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewRol', { params: params }).toPromise();
  }

  async ngGetViewMenu(option: number, model: IViewMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewMenu', { params: params }).toPromise();
  }

  async ngGetViewRolMenu(option: number, model: IViewRolMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewRolMenu', { params: params }).toPromise();
  }

  async ngGetViewSubMenu(option: number, model: IViewSubMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewSubMenu', { params: params }).toPromise();
  }

  async ngGetViewRolSubMenu(option: number, model: IViewRolSubMenu) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewRolSubMenu', { params: params }).toPromise();
  }

  async ngGetViewProductoEntrada(option: number, model: IViewProductoEntrada) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewProductoEntrada', { params: params }).toPromise();
  }

  async ngGetViewProductoSalida(option: number, model: IViewProductoSalida) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewProductoSalida', { params: params }).toPromise();
  }

  async ngGetViewProductoHistorial(option: number, model: IViewProductoHistorial) {
    let params = new HttpParams();

    params = params.append('option', option);
    Object.keys(model).forEach(key => { if (model[key] != '') { params = params.append(key, model[key]); } });

    return await this.http.get<IResponse>(this.serviceUrl + 'api/View/GetViewProductoHistorial', { params: params }).toPromise();
  }

  //#endregion "VIEW"


  //#region "POST"

  async ngPostToken(model: IAutenticacion) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/Token/Post', model).toPromise();
  }

  async ngPostUsuario(model: IUsuario) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/Usuario/Post', model).toPromise();
  }

  async ngPostRol(model: IRol) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/Rol/Post', model).toPromise();
  }

  async ngPostRolMenu(model: IRolMenu[]) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/RolMenu/Post', model).toPromise();
  }

  async ngPostRolSubMenu(model: IRolSubMenu[]) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/RolSubMenu/Post', model).toPromise();
  }

  async ngPostProductoEntrada(model: IProductoEntrada) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/ProductoEntrada/Post', model).toPromise();
  }

  async ngPostProductoSalida(model: IProductoSalida) {
    return await this.http.post<IResponse>(this.serviceUrl + 'api/ProductoSalida/Post', model).toPromise();
  }
  //#endregion "POST"


  //#region "PUT"

  async ngPutUsuario(option: number, model: IUsuario) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.put<IResponse>(this.serviceUrl + 'api/Usuario/Put', model, { params: params }).toPromise();
  }

  async ngPutRol(option: number, model: IRol) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.put<IResponse>(this.serviceUrl + 'api/Rol/Put', model, { params: params }).toPromise();
  }

  async ngPutMenu(option: number, model: IMenu) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.put<IResponse>(this.serviceUrl + 'api/Menu/Put', model, { params: params }).toPromise();
  }

  async ngPutSubMenu(option: number, model: ISubMenu) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.put<IResponse>(this.serviceUrl + 'api/SubMenu/Put', model, { params: params }).toPromise();
  }

  async ngPutProductoEntrada(option: number, model: IProductoEntrada) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.put<IResponse>(this.serviceUrl + 'api/ProductoEntrada/Put', model, { params: params }).toPromise();
  }

  //#endregion "PUT"


  //#region "DELETE"

  async ngDeleteUsuario(option: number, model: IUsuario[]) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.delete<IResponse>(this.serviceUrl + 'api/Usuario/Delete', { params: params, body: model }).toPromise();
  }

  async ngDeleteRol(model: IRol[]) {
    return await this.http.delete<IResponse>(this.serviceUrl + 'api/Rol/Delete', { body: model }).toPromise();
  }

  async ngDeleteRolMenu(model: IRolMenu) {
    return await this.http.delete<IResponse>(this.serviceUrl + 'api/RolMenu/Delete', { body: model }).toPromise();
  }

  async ngDeleteRolSubMenu(model: IRolSubMenu) {
    return await this.http.delete<IResponse>(this.serviceUrl + 'api/RolSubMenu/Delete', { body: model }).toPromise();
  }

  async ngDeleteProductoEntrada(option: number, model: IProductoEntrada[]) {
    let params = new HttpParams();
    params = params.append('option', option);

    return await this.http.delete<IResponse>(this.serviceUrl + 'api/ProductoEntrada/Delete', { params: params, body: model }).toPromise();
  }

  //#endregion "DELETE"

}
