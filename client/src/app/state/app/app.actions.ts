import { createAction, props } from '@ngrx/store';
import { User } from '../../shared/models/User';

export const loginSuccess = createAction(
  '[App Auth] login success',
  props<{ token: string}>(),
);
export const logoutSuccess = createAction(
  '[App Auth] logout success',
  props<{ token: string }>(),
);
export const getCurrentUser = createAction(
  '[App Current User] Get',
  props< { user: User }>()
);
export const updateCurrentUser = createAction(
  '[App Current User] Update',
  props< { user: User }>()
);
export const isInstalled = createAction('[App Service Worker] Installed');
export const isNotInstalled = createAction(
  '[App Service Worker] Not Installed',
);
export const spinnerShow = createAction('[App Spinner] Show');
export const spinnerHide = createAction('[App Spinner] Hide');
