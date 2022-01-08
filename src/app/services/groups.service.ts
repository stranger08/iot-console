import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  findMany() {
    const REQUEST_URL = `${this._hostUrl}/groups`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/groups/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  saveOne(group) {
    const REQUEST_URL = `${this._hostUrl}/groups`;
    return this.http.post(REQUEST_URL, group, this.auth());
  }
}
