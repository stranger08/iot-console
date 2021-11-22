import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  isLoggedIn() {
    return !!window.sessionStorage.getItem('SESSION');
  }

  login() {
    const SESSION_DATA = {
      token: 'token'
    };
    window.sessionStorage.setItem('SESSION', JSON.stringify(SESSION_DATA));
  }

  logout() {
    window.sessionStorage.removeItem('SESSION');
  }
}
