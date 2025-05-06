import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { EchartsxModule } from 'echarts-for-angular';

import { PaginatorIntl } from '../paginator-intl/paginator-intl';
import { DatePipe } from '@angular/common';

import { UserComponent } from './user/user.component';
import { DialogUserComponent } from './dialog-user/dialog-user.component';
import { RolMenuComponent } from './rol-menu/rol-menu.component';
import { DialogRolSubMenuComponent } from './dialog-rol-submenu/dialog-rol-submenu.component';
import { DialogSubMenuComponent } from './dialog-submenu/dialog-submenu.component';
import { DialogMenuComponent } from './dialog-menu/dialog-menu.component';
import { RolComponent } from './rol/rol.component';
import { DialogRolComponent } from './dialog-rol/dialog-rol.component';
import { ProductsEntryComponent } from './products-entry/products-entry.component';
import { ProductsOutputComponent } from './products-output/products-output.component';
import { ProductsHistoryComponent } from './products-history/products-history.component';
import { DialogProductsEntryComponent } from './dialog-products-entry/dialog-products-entry.component';

@NgModule({
  declarations: [
    MainComponent,
    UserComponent,
    DialogUserComponent,
    RolMenuComponent,
    DialogRolSubMenuComponent,
    DialogSubMenuComponent,
    DialogMenuComponent,
    RolComponent,
    DialogRolComponent,
    ProductsEntryComponent,
    ProductsOutputComponent,
    ProductsHistoryComponent,
    DialogProductsEntryComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,

    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSidenavModule,
    MatButtonModule,
    MatTooltipModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectFilterModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatStepperModule,
    MatButtonToggleModule,
    MatExpansionModule,
    EchartsxModule
  ],
  exports: [MainComponent, CommonModule, FormsModule],
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }, { provide: MAT_DATE_LOCALE, useValue: 'es-MX' }, DatePipe],
})
export class MainModule { }
