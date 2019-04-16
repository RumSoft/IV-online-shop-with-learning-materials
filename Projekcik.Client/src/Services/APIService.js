import axios from 'axios';
import decode from 'jwt-decode';

const API_URL = 'https://projekcik-prz.azurewebsites.net';

export default class APIService {
  static get(address) {
    let token = window.localStorage.getItem('token');
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios
      .get(`${API_URL}/${address}`, authHeader)
      .then(response => response.data);
  }

  static post(address, data) {
    let token = window.localStorage.getItem('token');
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios
      .post(`${API_URL}/${address}`, data, authHeader)
      .then(response => {
        window.localStorage.setItem('token', `${response.data.token}`);
        return response.data;
      });
  }

  static isAuthenticated() {
    let jwtToken = window.localStorage.getItem('token');
    if (!jwtToken) {
      return false;
    } else {
      let payload = decode(jwtToken);
      return payload.exp > new Date().getTime() / 1000 ? true : false;
    }
  }

  static facebookLogin(accessToken) {
    return APIService.post('/api/externalauth/facebook-login', {
      accessToken: accessToken
    });
  }

  static getVoivodeships() {
    return axios.get(`${API_URL}/api/Uni`).then(r => r.data);
  }

  static getUniversities(voivodeshipId) {
    return axios.get(`${API_URL}/api/Uni/${voivodeshipId}`).then(r => r.data);
  }

  static getCourses(universityId) {
    return axios
      .get(`${API_URL}/api/Uni/university/${universityId}`)
      .then(r => r.data);
  }
}
