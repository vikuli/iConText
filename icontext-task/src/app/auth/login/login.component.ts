import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MyErrorStateMatcher } from 'src/app/shared/forms/my-error-state-matcher';

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

  constructor(
    public authService: AuthService,
    public localStorage: LocalStorageService,
  ) {}

  login() {
    const roleCount = this.roles.length;
    let roleIndex = Math.floor(Math.random() * roleCount);
    setTimeout(() => {
      this.localStorage.setUserData(this.email.value as string);
      this.localStorage.setUserPassword(this.password.value as string);
      this.localStorage.setRole(this.roles[roleIndex] as string);
    }, 2000);
  }
}
