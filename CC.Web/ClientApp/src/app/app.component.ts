import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Shared } from '../shared/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener('window:beforeunload') ngRemoveLocalStorage() {
    localStorage.removeItem('token');
  }

  @HostListener('window:resize') ngResize() {
    if (window.innerWidth >= this.shared.screen) {
      // DESKTOP
      this.shared.rd = false;
      this.shared.expand = true;
    } else {
      // MOVIL
      this.shared.rd = true;
      this.shared.expand = true;
    }
  }

  constructor(private cdr: ChangeDetectorRef,private router: Router, public shared: Shared) {
    this.ngResize();
  }

  ngAfterViewInit(): void {
    this.shared.isLoading.subscribe((r) => { this.shared.loading = r; this.cdr.detectChanges(); });
    this.router.events.subscribe(async (event: RouterEvent) => { await this.ngOnInter(event); });
  }

  public async ngOnInter(event: RouterEvent) {
    if (event instanceof NavigationStart) {

      if (!event.url.includes('/login')) {
        if (window.localStorage.getItem('token') == null) {
          this.router.navigate(['login']);
        }
      }

    }
  }

}
