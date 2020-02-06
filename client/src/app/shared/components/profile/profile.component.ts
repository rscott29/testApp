import { Component, EventEmitter, HostBinding, OnInit } from '@angular/core';
import {
  animate,
  animateChild,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Store } from '@ngrx/store';
import { selectCurrentUser } from '../../../state/app';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  animations: [
    trigger('slideIn', [
      state('void', style({ transform: 'translateX(100%)' })),
      state('enter', style({ transform: 'translateX(0)' })),
      state('leave', style({ transform: 'translateX(-100%)' })),
      transition('* => *', animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
    trigger('ngIfAnimation', [
      transition(':enter, :leave', [query('@*', animateChild())]),
    ]),
    trigger('easeInOut', [
      transition('void => *', [
        style({
          opacity: 0,
        }),
        animate(
          '500ms ease-in',
          style({
            opacity: 1,
          }),
        ),
      ]),
      transition('* => void', [
        style({
          opacity: 1,
        }),
        animate(
          '500ms ease-in',
          style({
            opacity: 0,
          }),
        ),
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  @HostBinding('@slideIn') slideDown = 'enter';
  animationState: 'void' | 'enter' | 'leave' = 'enter';
  animationStateChanged = new EventEmitter<AnimationEvent>();
  userAvatar: string;
  userFullName: string;
  canEdit: boolean;
  showUpload = false;
  form: FormGroup;
  error: string;
  userId: string;
  uploadResponse = { status: '', message: '', filePath: '' };
  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private uploadService: UploadService,
  ) {}

  ngOnInit() {
    this.store.select(selectCurrentUser).subscribe(res => {
      this.userId = res.id;
      this.userAvatar = res.avatarUrl;
      this.userFullName = res.firstname + ' ' + res.lastname;
    });
    this.form = this.fb.group({
      avatar: [''],
    });
  }

  onAnimationStart(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.animationStateChanged.emit(event);
  }
  editModeActive() {
    this.canEdit = !this.canEdit;
    this.showUpload = false;
  }
  toggleUpload() {
    this.showUpload = !this.showUpload;
    this.canEdit = false;
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
      this.onSubmit();
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    formData.append('id', this.userId.toString());

    this.uploadService.upload(formData, this.userId).subscribe(
      res => {
        this.uploadResponse = res;
      },
      error => {
        console.log(error);
      },
    );
    setTimeout(() => {
      this.uploadService.updateAvatar().subscribe();
    },2000);
  }
}
