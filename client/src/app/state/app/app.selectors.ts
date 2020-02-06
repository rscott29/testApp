import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromApp from './app.reducer';

const getAppState = createFeatureSelector<fromApp.AppState>(
  fromApp.appFeatureKey,
);

export const selectSpinner = createSelector(
  getAppState,
  state => state.loaded,
);
export const selectInstalled = createSelector(
  getAppState,
  state => state.installed,
);
export const selectLoggedIn = createSelector(
  getAppState,
  state => state.loggedIn,
);
export const selectIsAuth = createSelector(
  getAppState,
  state => state.authenticated,
);

export const selectCurrentUser = createSelector(
  getAppState,
  state => state.user.me
);
// export const selectCurrentUserId = createSelector(
//   getAppState,
//   state => state.user.me.id
// );
// export const selectCurrentUserAvatar = createSelector(
//   getAppState,
//   state => state.user.me.avatarUrl
// );
