import { SearchData } from './search.model';
import { Action, createReducer, on } from '@ngrx/store';
import * as SearchActions from '../search/search.actions';
import * as AppActions from '../app/app.actions';
export const searchFeatureKey = 'search';
export interface ReducerLoadingState {
  payload: SearchData[];
  loading: boolean;
  toggled: boolean;
}
export const initialLoadingState: ReducerLoadingState = {
  payload: [],
  loading: true,
  toggled: false
};

const searchReducer = createReducer(
  initialLoadingState,
  on(SearchActions.showSearchResults, state => ({
    ...state,
    toggled: !state.toggled
  })),
  on(SearchActions.clearSearchResults, state => ({
    ...state,
    toggled: initialLoadingState.toggled,
    payload: initialLoadingState.payload
  })),
  on(SearchActions.searchSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    payload: [...payload]
  }))
);
export function SearchReducer(
  state: ReducerLoadingState | undefined,
  action: Action
) {
  return searchReducer(state, action);
}
