import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { SidenavService } from './services/sidenav.service';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchService } from './services/search.service';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { LoginSignupComponent } from './components/login-signup/login-signup.component';
import { AuthService } from './services/auth.service';
import { SnackbarService } from './services/snackbar.service';
import { LayoutComponent } from './components/layout/layout.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileOverlayService } from './services/profile-overlay.service';

import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [

    HomeComponent,
    SnackbarComponent,
    HeaderComponent,
    LeftMenuComponent,
    FilterPipe,
    SearchResultsComponent,
    LoginSignupComponent,
    LayoutComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ScrollingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    OverlayModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    HeaderComponent,
    LeftMenuComponent,
    FilterPipe,
    LoginSignupComponent,
    LayoutComponent,
  ],
  providers: [
    SidenavService,
    SearchService,
    SnackbarService,
    AuthService,
    ProfileOverlayService,
  ],
})
export class SharedModule {}
