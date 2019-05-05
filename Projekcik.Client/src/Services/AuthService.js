import APIService from './APIService';

export default class AuthService {
  static register(userData) {
    return APIService.post('api/Auth/register', userData);
  }

  static login(userData) {
    return APIService.post('api/Auth/authenticate', userData);
  }

  static facebookLogin(accessToken) {
    return APIService.post('api/externalauth/facebook-login', {
      accessToken: accessToken
    });
  }

  static handleLogin(data) {
    window.localStorage.setItem('token', `${data.token}`);
  }

  static logout() {
    if (APIService.isAuthenticated()) {
      window.localStorage.removeItem('token');
    }
  }
}
