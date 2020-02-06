import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { appFeatureKey, AppReducer } from './app.reducer';

@NgModule({
  imports: [StoreModule.forFeature(appFeatureKey, AppReducer)]
})
export class AppStateModule {}
