import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/core/services/auth.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  roles = ['user', 'admin', 'moderator', 'guest'];

  constructor(public authService: AuthService) {}

  login() {
    const roleCount = this.roles.length;
    let role = Math.floor(Math.random() * roleCount);
    localStorage.setItem('login', this.email.value as string);
    localStorage.setItem('password', this.password.value as string);
    localStorage.setItem('role', this.roles[role]);
  }
}
