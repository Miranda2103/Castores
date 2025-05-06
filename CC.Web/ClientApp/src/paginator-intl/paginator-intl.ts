import { MatPaginatorIntl } from '@angular/material/paginator';
import { Shared } from '../shared/shared';
import { Injectable } from '@angular/core';

@Injectable()
export class PaginatorIntl extends MatPaginatorIntl {

  OF_LABEL: string = '';

  constructor(public shared: Shared) {
    super();
    this.getPaginatorIntl();
  }

  getRangeLabel = (page: number, pageSize: number, length: number,) => {

    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }

    length = Math.max(length, 0);

    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.OF_LABEL} ${length}`;

  };

  getPaginatorIntl() {
    this.itemsPerPageLabel = 'Registros por pagina';
    this.nextPageLabel = 'Siguiente pagina';
    this.previousPageLabel = 'Pagina anterior';
    this.firstPageLabel = 'Pagina inicial';
    this.lastPageLabel = 'Ultima pagina';
    this.OF_LABEL = 'de';
    this.changes.next();
  }

}
