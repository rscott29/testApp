import { Action, createReducer, on } from '@ngrx/store';
import * as AppActions from './app.actions';
import { initialLoadingState } from '../search';
import { User } from '../../shared/models/User';

export const appFeatureKey = 'app';
export interface AppState {
  loaded: boolean;
  installed: boolean;
  loggedIn: boolean;
  authenticated: boolean;
  user: User

}
export const initialAppState: AppState = {
  loaded: true,
  installed: false,
  loggedIn: false,
  authenticated: false,
  user: null
};

const appReducer = createReducer(
  initialAppState,
  on(AppActions.spinnerShow, state => ({ ...state, loaded: true })),
  on(AppActions.spinnerHide, state => ({ ...state, loaded: false })),
  on(AppActions.isInstalled, state => ({ ...state, installed: true })),
  on(AppActions.isNotInstalled, state => ({ ...state, installed: false })),
  on(AppActions.loginSuccess, (state, payload) => ({
    ...state,
    ...payload,
    authenticated: true,
  })),
  on(AppActions.getCurrentUser, (state, payload) => ({
    ...state,
    ...payload,
  })),
  on(AppActions.updateCurrentUser, (state, payload) => ({
    ...state,
    ...payload,
  })),
  on(AppActions.logoutSuccess, state => ({
    ...state,
    authenticated: initialAppState.authenticated,
    payload: initialLoadingState.payload,
  })),
);

export function AppReducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
