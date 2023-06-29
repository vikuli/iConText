import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = false;

  constructor(
    private router: Router,
    public localStorage: LocalStorageService,
  ) {
    if (localStorage.getEmail() && localStorage.getPassword()) {
      this.isAuthorized = true;
    }
  }

  login() {
    if (this.localStorage.getEmail() && this.localStorage.getPassword()) {
      this.isAuthorized = true;
      this.router.navigate(['/home']);
    }
  }
}
