import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Shared } from '../shared/shared';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  private requests: HttpRequest<any>[] = [];

  constructor(private share: Shared) { }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = window.localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    this.requests.push(request);
    this.share.isLoading.next(true);

    return Observable.create((observer: { next: (arg0: HttpEvent<any>) => void; error: (arg0: any) => void; complete: () => void; }) => {

      const subscription = next.handle(request)
        .subscribe(
          event => {
            if (event instanceof HttpResponse) {
              this.remove(request);
              observer.next(event);
            }
          },
          err => {
            console.error(err);
            this.remove(request);
            observer.error(err);
          },
          () => {
            this.remove(request);
            observer.complete();
          });

      return () => {
        this.remove(request);
        subscription.unsubscribe();
      };

    });

  }

  public remove(request: HttpRequest<any>) {
    try {
      const i = this.requests.indexOf(request);

      if (i >= 0) {
        this.requests.splice(i, 1);
      }

      this.share.isLoading.next(this.requests.length > 0);
    } catch (e) {
      console.error(e);
    }

  }

}
