import { Component, OnInit } from '@angular/core';
import {
  faFacebookF,
  faLinkedin,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AuthService} from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../services/snackbar.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css'],
})
export class LoginSignupComponent implements OnInit {
  constructor(
    private library: FaIconLibrary,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private fb: FormBuilder,
    private store: Store<any>,
    private router: Router,
  ) {
    library.addIcons(faFacebookF, faTwitter, faLinkedin);
  }
  status = false;
  registerForm: FormGroup;
  signInForm: FormGroup;
  registrationData: User;
  signInData: User;
  cookieValue: string;

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: [''],
      email: [''],
      password: [''],
    });
    this.signInForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(8), Validators.required]],
    });
  }
  clickEvent() {
    this.status = !this.status;
  }

  register() {
    this.registrationData = this.registerForm.value;
    this.authService.register(this.registrationData).subscribe(
      ({ data }) => {
        this.status = !this.status;
        this.snackbarService.open('Registration Successful', 'Ok');

      },
      error => {

        this.snackbarService.open(error.message, 'Ok');
      },
    );
  }
  login() {
    this.signInData = this.signInForm.value;
    this.authService.signIn(this.signInData).subscribe(
      res => {
        console.log(res);
        this.snackbarService.open('Login Successful', 'Ok' , 3000, 'top', 'right');
        this.router.navigate(['/home']);
      },
      errors => {
       errors = 'Login Error  ' +  errors.graphQLErrors.map(x => x.message.message);
        this.snackbarService.open(errors, 'Ok', 30000 , 'top', 'right');
      },
    );
  }
}
