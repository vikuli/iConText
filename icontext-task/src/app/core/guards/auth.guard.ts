import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, public authService: AuthService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isAuthorized) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
