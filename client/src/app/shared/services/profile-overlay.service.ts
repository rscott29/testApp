import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ProfileComponent } from '../components/profile/profile.component';
import { ProfileOverlayRef } from '../helpers/profile-overlay-ref';

interface ProfileDialogConfig {
  panelClass?: string;
  hasBackdrop?: boolean;
  backdropClass?: string;
}

const DEFAULT_CONFIG: ProfileDialogConfig = {
  hasBackdrop: true,
  backdropClass: 'dark-backdrop',
  panelClass: 'profile',
};

@Injectable()
export class ProfileOverlayService {
  constructor(private overlay: Overlay) {}

  open(config: ProfileDialogConfig = {}) {
    const dialogConfig = { ...DEFAULT_CONFIG, ...config };
    const overlayRef = this.createOverlay(dialogConfig);
    const dialogRef = new ProfileOverlayRef(overlayRef);
    const profilePortal = new ComponentPortal(ProfileComponent);

    overlayRef.attach(profilePortal);
    overlayRef.backdropClick().subscribe(_ => dialogRef.close());

    return dialogRef;
  }

  private createOverlay(config: ProfileDialogConfig) {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  private getOverlayConfig(config: ProfileDialogConfig): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .global().right(`${window.innerWidth}`).centerVertically().top('180px');

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
    });

    return overlayConfig;
  }
}
