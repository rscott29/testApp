import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { isInstalled, isNotInstalled } from '../../state/app/app.actions';
import { WINDOW } from './window.service';

@Injectable()
export class PwaService {
  promptEvent;
  testBrowser: boolean;
  constructor(
    private swUpdate: SwUpdate,
    @Inject(WINDOW) private window: Window,
    @Inject(PLATFORM_ID) platformId: string,
    private store: Store<any>
  ) {
    this.testBrowser = isPlatformBrowser(platformId);
    if (this.testBrowser) {
      swUpdate.available.subscribe(event => {
        /*if (askUserToUpdate()) {
          window.location.reload();
        }*/
      });
    }
  }
  detectInstall() {
    window.addEventListener('beforeinstallprompt', event => {
      event.preventDefault();
      this.store.dispatch(isNotInstalled());
      this.promptEvent = event;
    });
  }
  install() {
    if (this.promptEvent) {
      this.promptEvent.prompt();
      this.promptEvent.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          this.store.dispatch(isInstalled());
        }
        this.promptEvent.preventDefault();
        this.promptEvent = null;
      });
    }
  }
}
