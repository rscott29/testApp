import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { SearchData } from '../../../state/search/search.model';
import {
  clearSearchResults,
  getSearchToggled,
  showSearchResults,
} from '../../../state/search';
import { selectCurrentUser } from '../../../state/app';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal } from '@angular/cdk/portal';

import { ProfileOverlayService } from '../../services/profile-overlay.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() valueInParentComponent: string;
  @ViewChild('searchbar') searchbar: ElementRef;
  @ViewChild('overlayTemplate') overlayTemplate: CdkPortal;
  searchText: string;
  username: string;
  avatarUrl: string;
  toggleSearch;

  constructor(
    private store: Store<{ data: SearchData[] }>,
    private authService: AuthService,
    private profileOverlayService: ProfileOverlayService
  ) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(res => {
      this.avatarUrl = res.avatarUrl;
      this.username = res.firstname;
    });
  }
  openProfile() {
   this.profileOverlayService.open()
  }
  openSearch() {
    this.toggleSearch = this.store.select(getSearchToggled);
    this.store.dispatch(showSearchResults());
    this.searchbar.nativeElement.focus();
  }
  searchClose() {
    this.toggleSearch = false;
    this.store.dispatch(clearSearchResults());
  }
  logout() {
    this.authService.signOut();
  }
}
