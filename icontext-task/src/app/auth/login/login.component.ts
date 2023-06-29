import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MyErrorStateMatcher } from 'src/app/shared/forms/my-error-state-matcher';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loading = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  password = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  roles = ['user', 'admin', 'moderator', 'guest'];

  constructor(
    public authService: AuthService,
    public localStorage: LocalStorageService,
    public toastr: ToastrService,
  ) {}

  login() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      if (
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(
          this.password.value!,
        )
      ) {
        this.writeData();
        this.authService.login();
        this.showSuccess();
      } else {
        this.showPasswordError();
      }
    }, 2000);
  }

  writeData() {
    const roleCount = this.roles.length;
    let roleIndex = Math.floor(Math.random() * roleCount);
    this.localStorage.setUserData(this.email.value as string);
    this.localStorage.setUserPassword(this.password.value as string);
    this.localStorage.setRole(this.roles[roleIndex] as string);
  }

  showSuccess() {
    this.toastr.success('You are logged in', 'Success!');
  }

  showPasswordError() {
    this.toastr.error(
      'The password must be at least 6 characters long and must contain upper and lower case latin letters, numbers and special characters.',
      'Error!',
    );
  }
}
