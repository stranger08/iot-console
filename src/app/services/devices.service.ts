import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './BaseService';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class DevicesService extends BaseService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    super();
  }

  findMany() {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/devices?project=${PROJECT_ID}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/devices/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findData(id) {
    const REQUEST_URL = `${this._hostUrl}/devices/data/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  saveOne(device) {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/devices?project=${PROJECT_ID}`;
    return this.http.post(REQUEST_URL, device, this.auth());
  }

  deleteOne(id) {
    const REQUEST_URL = `${this._hostUrl}/devices/${id}`;
    return this.http.delete(REQUEST_URL, this.auth());
  }

}
