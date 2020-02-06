import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { PwaService } from './core/services/pwa.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { AppStateModule } from './state/app';
import { WINDOW_PROVIDERS } from './core/services/window.service';
import { storageMetaReducer } from './core/reducers/storage.metareducer';
import { EffectsModule } from '@ngrx/effects';
import { SearchEffects } from './state/search';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SearchStateModule } from './state/search';



import { RouterModule, Routes } from '@angular/router';
import { LoginSignupComponent } from './shared/components/login-signup/login-signup.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { buildSpecificModules } from './build-specifics';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { GraphQLModule } from './graphql.module';


const appRoutes: Routes = [
  { path: 'login', component: LoginSignupComponent },
  { path: 'home', component: LayoutComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    SharedModule,
    StoreModule.forRoot([], {
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    //  metaReducers: [storageMetaReducer],
    }),
    ...buildSpecificModules,
    AppStateModule,
    SearchStateModule,
    EffectsModule.forRoot([SearchEffects]),
    AppStateModule,
    HttpClientModule,
    GraphQLModule,
  ],
  providers: [
    PwaService,
    WINDOW_PROVIDERS,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptor,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
