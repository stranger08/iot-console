import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  _hostUrl:string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  isLoggedIn() {
    return !!window.sessionStorage.getItem('token');
  }

  login(username, password) {
    const REQUEST_URL = `${this._hostUrl}/login`;
    return this.http.post(REQUEST_URL, { username, password }, {});
  }

  logout() {
    window.sessionStorage.removeItem('token');
  }
}
