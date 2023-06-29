import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  userName = '';

  setUserData(
    email: string,
    firstName: string = 'Ivan',
    lastName: string = 'Ivanov',
    phoneNumber: string = '0000000000',
    url: string = '',
  ) {
    localStorage.setItem('email', email as string);
    localStorage.setItem('firstName', firstName as string);
    localStorage.setItem('lastName', lastName as string);
    localStorage.setItem('phoneNumber', phoneNumber as string);
    localStorage.setItem('url', url as string);
  }

  setUserPassword(password: string) {
    localStorage.setItem('password', password as string);
  }

  setRole(role: string) {
    localStorage.setItem('role', role as string);
  }

  getUserName() {
    if (this.getFirstName() && this.getLastName()) {
      this.userName = `${this.getFirstName()} ${this.getLastName()}`;
    } else {
      this.userName = 'Your name';
    }
    return this.userName;
  }

  getEmail() {
    return localStorage.getItem('email');
  }

  getPassword() {
    return localStorage.getItem('password');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getFirstName() {
    return localStorage.getItem('firstName');
  }

  getLastName() {
    return localStorage.getItem('lastName');
  }

  getPhoneNumber() {
    return localStorage.getItem('phoneNumber');
  }

  getUrl() {
    return localStorage.getItem('url');
  }
}
