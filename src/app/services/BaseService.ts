export class BaseService {

  _hostUrl:string = 'http://localhost:8050';

  auth() {
    return {
      headers: { ['Authorization']: `Bearer ${window.sessionStorage.getItem('token')}` }
    };
  }
}