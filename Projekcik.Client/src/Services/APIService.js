import axios from 'axios';

const authToken = 'auth_token';

export default class APIService {
  static API_URL = 'https://projekcik-prz.azurewebsites.net';

  static get(address) {
    return this.rawGet(address).then(x => x.data);
  }

  static rawGet(address) {
    let token = window.localStorage.getItem(authToken);
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios.get(`${this.API_URL}/${address}`, authHeader);
  }

  static post(address, data) {
    let token = window.localStorage.getItem(authToken);
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    return axios
      .post(`${this.API_URL}/${address}`, data, authHeader)
      .then(response => {
        return response.data;
      });
  }
}
