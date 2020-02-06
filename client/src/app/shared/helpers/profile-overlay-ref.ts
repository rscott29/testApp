import { OverlayRef } from '@angular/cdk/overlay';

export class ProfileOverlayRef {

  constructor(private overlayRef: OverlayRef) { }

  close(): void {
    this.overlayRef.detach();
  }
}
