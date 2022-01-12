import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './BaseService';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  findMany() {
    const REQUEST_URL = `${this._hostUrl}/projects?list=all`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  findOne(id) {
    const REQUEST_URL = `${this._hostUrl}/projects/${id}`;
    return this.http.get(REQUEST_URL, this.auth());
  }

  deleteOne(id) {
    const REQUEST_URL = `${this._hostUrl}/projects/${id}`;
    return this.http.delete(REQUEST_URL, this.auth());
  }

  saveOne(group) {
    const REQUEST_URL = `${this._hostUrl}/projects`;
    return this.http.post(REQUEST_URL, group, this.auth());
  }

  addUserToProject(projectId, userEmail) {
    const REQUEST_URL = `${this._hostUrl}/projects/join/${projectId}/${userEmail}`;
    return this.http.post(REQUEST_URL, {}, this.auth());
  }

  findUserProjects() {
    const REQUEST_URL = `${this._hostUrl}/projects?list=assigned`;
    return this.http.get(REQUEST_URL, this.auth());
  }
}
