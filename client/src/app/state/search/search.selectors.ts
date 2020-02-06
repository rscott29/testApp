import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSearch from './search.reducer';
import { SearchData } from './search.model';

const getSearchState = createFeatureSelector<fromSearch.ReducerLoadingState>(
  fromSearch.searchFeatureKey
);
export interface LoadingState {
  toggled: boolean;
  payload: SearchData[];
}
export const getSearchToggled = createSelector(
  getSearchState,
  (state: LoadingState) => state.toggled
);

export const getAllSearchItems = createSelector(
  getSearchState,
  (state: LoadingState) => state.payload
);
