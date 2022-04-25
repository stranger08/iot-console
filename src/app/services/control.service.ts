import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ControlService extends BaseService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
  ) {
    super();
  }

  findMany() {
    const REQUEST_URL = `${this._hostUrl}/controls?list=all`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findManyByProject() {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/controls/list/${PROJECT_ID}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/controls/details/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  deleteOne(id) {
    const REQUEST_URL = `${this._hostUrl}/controls/${id}`;
    return this.http.delete(REQUEST_URL, this.auth());
  }

  saveOne(control) {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/controls`;
    const REQUEST_PAYLOAD = {
      project: {
        id: PROJECT_ID
      },
      control: control,
    }
    return this.http.post(REQUEST_URL, REQUEST_PAYLOAD, this.auth());
  }

}
