import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Store } from '@ngrx/store';

import { selectCurrentUser,} from '../../../state/app';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  form: FormGroup;
  error: string;
  userId: string;
  uploadResponse = { status: '', message: '', filePath: '' };
  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private store: Store<any>,
  ) {}
  ngOnInit() {
    this.form = this.fb.group({
      avatar: [''],
    });
    this.store.select(selectCurrentUser).subscribe(res => {
      this.userId = res.id;
      console.log(this.userId);
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);
    formData.append('id', this.userId.toString());

    this.uploadService
      .upload(formData, this.userId)
      .subscribe(res => (this.uploadResponse = res), err => (this.error = err));
  }
}
