import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class SnackbarService {
  constructor(public snackBar: MatSnackBar, private zone: NgZone) {}

  public open(message, action, duration?, verticalPos?, horizontalPos?) {
    this.zone.run(() => {
      this.snackBar.open(message, action, { duration, verticalPosition: verticalPos, horizontalPosition: horizontalPos });
    });
  }
}
