import APIService from './APIService';
import decode from 'jwt-decode';

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
    if (this.isAuthenticated()) {
      window.localStorage.removeItem('token');
    }
  }

  static isAuthenticated() {
    let jwtToken = window.localStorage.getItem('token');
    if (!jwtToken) {
      window.localStorage.removeItem('token');
      return false;
    } else {
      let payload = decode(jwtToken);
      return payload.exp > new Date().getTime() / 1000 ? true : false;
    }
  }
}
