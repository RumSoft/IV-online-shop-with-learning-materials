import APIService from './APIService';
import decode from 'jwt-decode';

const authToken = 'auth_token';

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
    window.localStorage.setItem(authToken, `${data.token}`);
  }

  static logout() {
    if (this.isAuthenticated()) {
      window.localStorage.removeItem(authToken);
    }
  }

  static getCurrentUserId() {
    if (!this.isAuthenticated()) return '';

    let jwtToken = window.localStorage.getItem(authToken);
    let payload = decode(jwtToken);
    let idKey = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid';
    return payload[idKey];
  }

  static isAuthenticated() {
    let jwtToken = window.localStorage.getItem(authToken);
    if (
      jwtToken &&
      jwtToken.length &&
      jwtToken !== undefined &&
      jwtToken !== 'undefined'
    ) {
      let payload = decode(jwtToken);
      return payload.exp > new Date().getTime() / 1000 ? true : false;
    }
    return false;
  }
}
