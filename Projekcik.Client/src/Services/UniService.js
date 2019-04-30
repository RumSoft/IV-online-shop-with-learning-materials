import axios from 'axios';

const API_URL = 'https://projekcik-prz.azurewebsites.net';

export default class UniService {
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
  static getNotes(notesId) {
    return axios
      .get(`${API_URL}/api/Uni/notes/${notesId}`)
      .then(r => r.data);
  }
}
