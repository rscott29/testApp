import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAuth } from '../../state/app';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  isAuth: boolean;
  constructor(private store: Store<any>, private router: Router) {}
  canActivate(): boolean {
    this.store.select(selectIsAuth).subscribe(res => {

      this.isAuth = res;
    });
    if (!this.isAuth) {
      this.router.navigate(['/login']);
    }

    return this.isAuth;
  }
}
