import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngrx/store';
import { getCurrentUser, loginSuccess, logoutSuccess } from '../../state/app';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userQuery = gql `
      {
          me {
              id
              email
              firstname
              lastname
              avatarUrl
          }
      }
  `;
  signUpMutation = gql`
    mutation SignUp($data: SignUpInput) {
      signup(signUpInput: $data) {
        email
        username
      }
    }
  `;
  signInMutation = gql`
    mutation login($data: LoginInput!) {
      login(data: $data) {
   
        token
      }
    }
  `;
  constructor(
    private apollo: Apollo,
    private store: Store<any>,
    private router: Router,
    private snackbarService: SnackbarService,
  ) {}
  register(data: User) {
    return this.apollo.mutate({
      mutation: this.signUpMutation,
      variables: {
        data,
      },
    });
  }
  getCurrentUser() {
    return this.apollo.query<User>({
      query: this.userQuery,
      fetchPolicy: 'no-cache'
    }).pipe(
      map( res => {
        console.log(res);
        this.store.dispatch(getCurrentUser({user: res.data}))
      })
    )
  }
  signIn(data: User) {
    return this.apollo
      .mutate<User>({
        mutation: this.signInMutation,
        variables: {
          data,
        },
      })
      .pipe(
        map(res => {
          this.store.dispatch(loginSuccess({ token: res.data['login'].token }));
          console.log(res);
          localStorage.setItem('userToken', res.data['login'].token);
        }),
      );
  }
  signOut() {
    this.router.navigate(['']);
    this.snackbarService.open('Logout Successful', 'Ok');
    localStorage.removeItem('userToken');
  }
}
