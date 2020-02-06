import { createAction, props } from '@ngrx/store';
import { SearchData } from './search.model';

export const showSearchResults = createAction('[SEARCH] Show');
export const clearSearchResults = createAction('[SEARCH] Clear');
export const searchSuccess = createAction(
  '[SEARCH] Search Loaded Success',
  props<{ payload: SearchData[] }>()
);
