import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from '../../animations/animations';
import { SidenavService } from '../../services/sidenav.service';
import { selectCurrentUser } from '../../../state/app';
import { Store } from '@ngrx/store';

interface Page {
  link: string;
  name: string;
  icon: string;
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText]
})
export class LeftMenuComponent implements OnInit {
  public sideNavState = false;
  public linkText = false;
  avatarUrl: string;

  public pages: Page[] = [
    { name: 'Inbox', link: 'some-link', icon: 'inbox' },
    { name: 'Starred', link: 'some-link', icon: 'star' },
    { name: 'Send email', link: 'some-link', icon: 'send' }
  ];

  constructor(private sidenavService: SidenavService, private store: Store<any>) {}

  ngOnInit() {
     this.store.select(selectCurrentUser).subscribe(res => {
       this.avatarUrl = res.avatarUrl;
    })
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this.sidenavService.sideNavState$.next(this.sideNavState);
  }
}
