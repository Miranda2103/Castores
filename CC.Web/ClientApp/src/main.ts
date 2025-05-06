import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

function getServiceUrl() {
  if (location.hostname == 'localhost') {
    return 'https:' + '//' + location.hostname + ':' + environment.port + '/';
  } else {
    return location.protocol + '//' + location.hostname + ':' + environment.port + '/';
  }
}

var providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'SERVICE_URL', useFactory: getServiceUrl, deps: [] },
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule).catch(err => console.error(err));
