import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized = false;

  loading = false;

  constructor(
    private router: Router,
    public localStorage: LocalStorageService,
  ) {
    if (localStorage.getEmail() && localStorage.getPassword()) {
      this.isAuthorized = true;
    }
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      if (this.localStorage.getEmail() && this.localStorage.getPassword()) {
        this.loading = false;
        this.isAuthorized = true;
        this.router.navigate(['/home']);
      }
    }, 2000);
  }
}
