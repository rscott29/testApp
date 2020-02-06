import {
  AfterContentInit,
  Component,
  Inject,
  isDevMode,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { WINDOW } from '../../../core/services/window.service';
import { select, Store } from '@ngrx/store';
import { PwaService } from '../../../core/services/pwa.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SidenavService } from '../../services/sidenav.service';
import {
  selectInstalled,
  selectSpinner,
  spinnerHide,
  spinnerShow,
} from '../../../state/app';
import { SnackbarComponent } from '../snackbar/snackbar.component';
import { onMainContentChange } from '../../animations/animations';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  animations: [onMainContentChange],
})
export class LayoutComponent implements OnInit, AfterContentInit {
  message = 'install to desktop';
  isInstalled: Observable<boolean>;
  isLoading$: Observable<boolean>;
  public onSideNavChange: boolean;
  constructor(
    @Inject(WINDOW) private window: Window,
    private store: Store<any>,
    private pwaService: PwaService,
    public snackBar: MatSnackBar,
    private sidenavService: SidenavService,
  ) {
    this.sidenavService.sideNavState$.subscribe(res => {
      this.onSideNavChange = res;
    });
  }
  ngOnInit(): void {
    this.isLoading$ = this.store.pipe(select(selectSpinner));
    this.store.dispatch(spinnerShow());
    this.pwaService.detectInstall();
    this.isInstalled = this.store.pipe(select(selectInstalled));
    if (!isDevMode()) {
      this.isInstalled.subscribe(installable => {
        if (!installable) {
          this.openSnackBar(this.message, 'spaInstall');
        } else {
          this.snackBar.dismiss();
        }
      });
    }
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.store.dispatch(spinnerHide());
    }, 1000);
  }
  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass,
      duration: 0,
    });
  }
}
