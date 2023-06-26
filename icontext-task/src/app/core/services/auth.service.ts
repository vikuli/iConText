import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthorized: boolean = false;

  userName: string = 'Your Name';

  loading = false;

  constructor(private router: Router) {
    if (localStorage.getItem('login')) {
      this.isAuthorized = true;
      this.userName = <string>localStorage.getItem('login');
    }
  }

  login() {
    this.loading = true;
    setTimeout(() => {
      if (localStorage.getItem('login')) {
        this.loading = false;
        this.isAuthorized = true;
        this.userName = <string>localStorage.getItem('login');
        this.router.navigate(['/']);
      }
    }, 2000);
  }
}
