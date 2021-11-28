export class BaseService {

    auth() {
        return {
          headers: { ['Authorization']: `Bearer ${window.sessionStorage.getItem('token')}` }
        };
    }
}