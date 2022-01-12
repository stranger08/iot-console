import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService {

  constructor(
    private http: HttpClient,
    private sessionService: SessionService
  ) {
    super();
  }

  findMany() {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/groups?project=${PROJECT_ID}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/groups/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  deleteOne(id) {
    const REQUEST_URL = `${this._hostUrl}/groups/${id}`;
    return this.http.delete(REQUEST_URL, this.auth());
  }

  saveOne(group) {
    const PROJECT_ID = this.sessionService.getSelectedProject();
    const REQUEST_URL = `${this._hostUrl}/groups?project=${PROJECT_ID}`;
    return this.http.post(REQUEST_URL, group, this.auth());
  }
}
