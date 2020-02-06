import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { searchFeatureKey, SearchReducer } from './search.reducer';

@NgModule({
  imports: [StoreModule.forFeature(searchFeatureKey, SearchReducer)]
})
export class SearchStateModule {}
