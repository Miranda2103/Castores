import { AfterViewInit, ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Message } from '.././message/message';
import { Shared } from '.././shared/shared';
import { Constant } from '../constants/constant';
import { IResponse, IViewRolMenu, IViewRolSubMenu } from '../interface/interface.interface';
import { ServiceService } from '../service/service.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements AfterViewInit {

  iViewRolMenu: IViewRolMenu;
  inViewRolMenu: IViewRolMenu[] = [];
  inViewRolMenuFilter: IViewRolMenu[] = [];

  iViewRolSubMenu: IViewRolSubMenu;
  inViewRolSubMenu: IViewRolSubMenu[] = [];
  inViewRolSubMenuFilter: IViewRolSubMenu[] = [];

  matExpansionPanel: MatExpansionPanel;

  mode: MatDrawerMode = 'side';
  opened: boolean = true;
  closed: boolean = false;
  focus: boolean = false;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  @HostListener('window:resize', ['$event'])
  ngResize() {
    if (window.innerWidth >= this.shared.screen) {
      // DESKTOP
      this.mode = 'side'
      this.opened = true;
      this.closed = true;
      this.focus = true;
    } else {
      // MOVIL      
      this.mode = 'over'
      this.opened = false;
      this.closed = false;
      this.focus = false;
    }
  }

  constructor(private cd: ChangeDetectorRef, public service: ServiceService, public shared: Shared, public constant: Constant, public message: Message, public dialog: MatDialog, private router: Router) { }

  async ngAfterViewInit(): Promise<void> {
    this.ngResize();
    this.ngController(1);
  }

  ngClean(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iViewRolMenu = { idRol: 0, rol: '', idMenu: 0, menu: '', ruta: '', icono: '', orden: 0, fecha: '', activo: true };
        break;
      }
      case 2: {
        this.iViewRolSubMenu = { idRol: 0, rol: '', idMenu: 0, menu: '', idSubMenu: 0, subMenu: '', subMenuR: '', ruta: '', icono: '', orden: 0, fecha: '', activo: true };
        break;
      }
      case 3: {
        this.inViewRolMenuFilter = [];
        break;
      }
      case 4: {
        this.inViewRolSubMenuFilter = [];
        break;
      }
    }

  }

  ngModel(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.iViewRolMenu.idRol = this.shared.idRol;
        break;
      }
      case 2: {
        this.iViewRolSubMenu.idRol = this.shared.idRol;
        break;
      }
      case 3: {
        this.inViewRolMenu = data;
        break;
      }
      case 4: {
        this.inViewRolSubMenu = data;
        break;
      }
    }

  }

  ngController(option: number, data?: any): void {

    switch (option) {
      case 1: {
        this.ngClean(1);
        this.ngModel(1);
        this.ngGetViewRolMenu(1, this.iViewRolMenu);
        break;
      }
      case 2: {
        this.ngClean(2);
        this.ngModel(2);
        this.ngGetViewRolSubMenu(1, this.iViewRolSubMenu);
        break;
      }
      case 3: {
        this.ngMenu();
        break;
      }
    }

  }

  async ngGetViewRolMenu(option: number, model: IViewRolMenu) {

    await this.service.ngGetViewRolMenu(option, model)
      .then((r: IResponse) => {

        if (r['success'] == true) {
          this.ngModel(3, r['data']);
          this.ngController(2);
        }
        else {
          this.message.dialogMessage(this.shared.ngFalse());
        }

      }).catch(
        (e: any) => {
          console.error(e);
          this.message.dialogMessage(this.shared.ngError(e));
        }
      ).finally(() => { });

  }

  async ngGetViewRolSubMenu(option: number, model: IViewRolSubMenu) {

    await this.service.ngGetViewRolSubMenu(option, model)
      .then((r: IResponse) => {

        if (r['success'] == true) {
          this.ngModel(4, r['data']);
          this.ngController(3);
        }
        else {
          this.message.dialogMessage(this.shared.ngFalse());
        }

      }).catch(
        (e: any) => {
          console.error(e);
          this.message.dialogMessage(this.shared.ngError(e));
        }
      ).finally(() => { });

  }

  ngMenu(): void {
    this.ngClean(3);
    this.inViewRolMenuFilter = this.inViewRolMenu.map(v => ({ idRol: v['idRol'], rol: v['rol'], idMenu: v['idMenu'], menu: v['menu'], ruta: v['ruta'], icono: v['icono'], orden: v['orden'], fecha: v['fecha'], activo: v['activo'] }));
  }

  ngCloseSide(): void {
    if (window.innerWidth <= this.shared.screen) {
      this.sidenav.close();
    }
  }

  ngClosePanel(): void {
    if (this.shared.rd == true) {
      this.sidenav.close();
    }
  }

  ngOpenPanel(idMenu: number, matExpansionPanel: MatExpansionPanel, event: Event): void {
    event.stopPropagation();
    this.ngClean(4);

    if (this.matExpansionPanel != undefined) {
      if (this.matExpansionPanel != matExpansionPanel) {
        this.matExpansionPanel.close();
      }
    }

    this.matExpansionPanel = matExpansionPanel;

    if (this.matExpansionPanel.expanded == true) {

      this.inViewRolSubMenu.forEach((v) => {
        if (v['idMenu'] == idMenu) {
          this.inViewRolSubMenuFilter.push({ 'idRol': v['idRol'], 'rol': v['rol'], 'idMenu': v['idMenu'], 'menu': v['menu'], 'idSubMenu': v['idSubMenu'], 'subMenu': v['subMenu'], 'subMenuR': v['subMenuR'], 'ruta': v['ruta'], 'icono': v['icono'], 'orden': v['orden'], 'fecha': v['fecha'], 'activo': v['activo'] });
        }
      });

    }

  }

}
