import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

import { SessionService } from '../../services/session.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  username = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  error = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private sessionService: SessionService
  ) {
  }

  showError(message) { 
    this.error = true;
    this.errorMessage = message;
  }

  hideError() {
    this.error = false;
    this.errorMessage = '';
  }

  login() {
    if (this.username.invalid) {
      this.showError('Missing credentials - username is required!');
      return;
    }

    if (this.password.invalid) {
      this.showError('Missing credentials - password is required!');
      return;
    }

    this.sessionService.login(this.username.value, this.password.value).pipe(
      catchError(e => {
        this.showError('Username of passowrd is incorrect. Please check your credentials!');
        return of()
      })
    )
    .subscribe(resp => {
      if (resp['token']) {
        window.sessionStorage.setItem('token', resp['token']);
        this.router.navigateByUrl('/');
      }
    });
  }
}
