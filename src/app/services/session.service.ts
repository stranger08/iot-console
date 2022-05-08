import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  projectChange: EventEmitter<number> = new EventEmitter();

  get projectChangeEvent() {
    return this.projectChange;
  }

  _hostUrl:string = 'http://localhost:8050';

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

  getSelectedProject() {
    return window.sessionStorage.getItem('project');
  }

  setSelectedProject(projectId) {
    window.sessionStorage.setItem('project', projectId);
    this.projectChangeEvent.emit(projectId);
  }
}
