import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Store } from '@ngrx/store';
import { getCurrentUser, updateCurrentUser } from '../../state/app';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  SERVER_URL = 'http://localhost:3000';
  userQuery = gql`
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
  constructor(
    private httpClient: HttpClient,
    private apollo: Apollo,
    private store: Store<any>,
  ) {}
  public upload(data, userId) {
    const uploadURL = `${this.SERVER_URL}/upload/` + userId;

    return this.httpClient
      .post<any>(uploadURL, data, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map(event => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              const progress = Math.round((100 * event.loaded) / event.total);
              return { status: 'progress', message: progress };

            case HttpEventType.Response:
              return event.body;
            default:
              return `Unhandled event: ${event.type}`;
          }
        }),
      );
  }
  updateAvatar() {
    // refetch query and update state
    return this.apollo.query<User>({ query: this.userQuery, fetchPolicy: 'no-cache',  }).pipe(
      map(res => {
        this.store.dispatch(updateCurrentUser({ user: res.data }));
      }),
    );
  }
}
