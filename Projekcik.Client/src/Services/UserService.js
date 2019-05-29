import axios from 'axios';

const API_URL = 'https://projekcik-prz.azurewebsites.net';

export default class UserService {

  static getUser(userId) {
    return axios
      .get(`${API_URL}/api/User/${userId}`)
      .then(r => r.data);
  }
}
