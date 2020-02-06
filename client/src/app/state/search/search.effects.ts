import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as searchActions from './search.actions';
import { SearchService } from '../../shared/services/search.service';

@Injectable()
export class SearchEffects {
  loadSearch$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchActions.showSearchResults),
      switchMap(action =>
        this.searchService.getAll().pipe(
          map(data => searchActions.searchSuccess({ payload: data }))
          //  catchError(error => of(error))
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) {}
}
