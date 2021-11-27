import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DevicesService {

  _hostUrl:string = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {
  }

  findMany() {
    const REQUEST_URL = `${this._hostUrl}/devices`;
    return this.http.get(REQUEST_URL, {});
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/devices/${id}`;
    return this.http.get(REQUEST_URL, {});
  }

  saveOne(device) {
    const REQUEST_URL = `${this._hostUrl}/devices`;
    return this.http.post(REQUEST_URL, device, {});
  }

}
