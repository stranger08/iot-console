import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends BaseService {

  _hostUrl:string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  findMany() {
    const REQUEST_URL = `${this._hostUrl}/devices`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/devices/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  saveOne(device) {
    const REQUEST_URL = `${this._hostUrl}/devices`;
    return this.http.post(REQUEST_URL, device, this.auth());
  }

}
