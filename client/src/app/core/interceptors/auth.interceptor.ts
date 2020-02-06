import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../state/app';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<any>) {}

  intercept(request: HttpRequest<any>, next: HttpHandler,): Observable<HttpEvent<any>> {
    const user = this.store.select(selectCurrentUser);
    const token = localStorage.getItem('userToken');
    if (token){
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(request);
    }
    }
}
