export class BaseService {

  _hostUrl:string = 'http://localhost:3000';

  auth() {
    return {
      headers: { ['Authorization']: `Bearer ${window.sessionStorage.getItem('token')}` }
    };
  }
}