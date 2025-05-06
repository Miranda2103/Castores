export interface IResponse {
  success: boolean,
  message: string,
  data: any
}

//#region "Interfaces"

export interface IAutenticacion {
  usuario: string,
  contrasena: string
}

export interface IUsuario {
  id: number;
  usuario: string,
  contrasena: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  nombreCompleto: string,
  cambiaContrasena: boolean,
  idRol: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IRol {
  id: number,
  rol: string,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IRolMenu {
  id: number,
  idRol: number,
  idMenu: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IMenu {
  id: number,
  menu: string,
  ruta: string,
  icono: string,
  orden: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IRolSubMenu {
  id: number,
  idRol: number,
  idMenu: number,
  idSubMenu: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface ISubMenu {
  id: number,
  idMenu: number,
  subMenu: string,
  ruta: string,
  icono: string,
  orden: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IExtensionDescarga {
  id: number,
  extension: string
}

export interface IProductoEntrada {
  id: number,
  producto: string,
  cantidad: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}

export interface IProductoSalida {
  id: number,
  idProducto: number,
  cantidad: number,
  idUsuarioInserta: number,
  fechaInserta: string,
  idUsuarioActualiza: number,
  fechaActualiza: string,
  activo: boolean
}
//#endregion "Interfaces"

//#region "View"

export interface IViewUsuario {
  idUsuario: number,
  usuario: string,
  contrasena: string,
  nombre: string,
  apellidoPaterno: string,
  apellidoMaterno: string,
  nombreCompleto: string,
  idRol: number,
  rol: string,
  fecha: string,
  activo: boolean
}

export interface IViewRol {
  idRol: number,
  rol: string,
  fecha: string,
  activo: boolean
}

export interface IViewMenu {
  idMenu: number,
  menu: string,
  ruta: string,
  icono: string,
  orden: number,
  estatus: boolean,
  fecha: string,
  activo: boolean
}

export interface IViewRolMenu {
  idRol: number,
  rol: string,
  idMenu: number,
  menu: string,
  ruta: string,
  icono: string,
  orden: number,
  fecha: string,
  activo: boolean
}

export interface IViewSubMenu {
  idMenu: number,
  menu: string,
  idSubMenu: number,
  subMenu: string,
  ruta: string,
  icono: string,
  orden: number,
  estatus: boolean,
  fecha: string,
  activo: boolean
}

export interface IViewRolSubMenu {
  idRol: number,
  rol: string,
  idMenu: number,
  menu: string,
  idSubMenu: number,
  subMenu: string,
  subMenuR: string,
  ruta: string,
  icono: string,
  orden: number,
  fecha: string,
  activo: boolean
}

export interface IViewProductoEntrada {
  idProducto: number,
  producto: string,
  cantidad: number,
  fecha: string,
  activo: boolean
}

export interface IViewProductoSalida {
  idProducto: number,
  producto: string,
  cantidadEntrada: number,
  cantidadSalida: number,
  cantidad: number,
  fecha: string,
  activo: boolean
}

export interface IViewProductoHistorial {
  producto: string,
  cantidad: number,
  usuario: string,
  fecha: string,
  hora: string,
  tipo: string,
  activo: boolean
}

//#endregion "View"
