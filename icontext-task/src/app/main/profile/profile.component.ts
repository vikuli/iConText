import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { MyErrorStateMatcher } from 'src/app/shared/forms/my-error-state-matcher';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  editMode = false;

  loading = false;

  email = new FormControl(this.localStorage.getEmail());

  firstName = new FormControl(this.localStorage.getFirstName(), [
    Validators.required,
    Validators.maxLength(255),
  ]);

  lastName = new FormControl(this.localStorage.getLastName(), [
    Validators.required,
    Validators.maxLength(255),
  ]);

  phoneNumber = new FormControl(this.localStorage.getPhoneNumber(), [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(10),
    Validators.pattern('^[0-9]*$'),
  ]);

  url = new FormControl(this.localStorage.getUrl(), [
    Validators.pattern(
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/,
    ),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(
    public localStorage: LocalStorageService,
    public toastr: ToastrService,
  ) {}

  save() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
      if (this.firstName.value!.length < 2 && this.lastName.value!.length < 2) {
        this.showFirstNameError();
        this.showLastNameError();
      } else if (this.firstName.value!.length < 2) {
        this.showFirstNameError();
      } else if (this.lastName.value!.length < 2) {
        this.showLastNameError();
      } else {
        this.updateProfile();
        this.showSuccess();
      }
    }, 2000);
  }

  updateProfile() {
    const http: string = 'http://';
    const https: string = 'https://';
    const ftp: string = 'ftp://';
    const urlSubstr = this.url.value?.slice(0, 8).toLowerCase();

    this.editMode = false;

    if (
      !this.url.value ||
      urlSubstr!.toLowerCase().includes(http) ||
      urlSubstr!.toLowerCase().includes(https) ||
      urlSubstr!.toLowerCase().includes(ftp)
    ) {
      this.url.setValue(this.url.value);
    } else {
      this.url.setValue(https + this.url.value);
    }
    this.localStorage.setUserData(
      this.email.value as string,
      this.firstName.value as string,
      this.lastName.value as string,
      this.phoneNumber.value as string,
      this.url.value as string,
    );
  }

  cancel() {
    this.editMode = false;
    this.firstName.setValue(this.localStorage.getFirstName());
    this.lastName.setValue(this.localStorage.getLastName());
    this.phoneNumber.setValue(this.localStorage.getPhoneNumber());
    this.url.setValue(this.localStorage.getUrl());
  }

  showSuccess() {
    this.toastr.success('Profile updated', 'Success!');
  }

  showFirstNameError() {
    this.toastr.error('First name is too short', 'Error!');
  }

  showLastNameError() {
    this.toastr.error('Last name is too short', 'Error!');
  }
}
