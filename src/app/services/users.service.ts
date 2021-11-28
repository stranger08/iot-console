import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  register(email, password) {
    const REQUEST_URL = `${this._hostUrl}/register`;
    return this.http.post(REQUEST_URL, { email, password }, {});
  }

  saveOne(user) {
    const REQUEST_URL = `${super._hostUrl}/users`;
    return this.http.post(REQUEST_URL, user, this.auth());
  }

  findOneByEmail(email) {
    const REQUEST_URL = `${super._hostUrl}/users/${email}`;
    return this.http.get(REQUEST_URL, this.auth());
  }
}
