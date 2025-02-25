import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private _loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._loaderService.show();
    let newRequest = request.clone({
      headers:request.headers.set("token" ,`${localStorage.getItem('token')}`)
    })
    return next.handle(newRequest).pipe(
      finalize(() => this._loaderService.hide()),
);
  }
}
