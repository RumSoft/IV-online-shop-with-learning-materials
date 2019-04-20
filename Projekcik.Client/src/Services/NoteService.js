import axios from 'axios';

const API_URL = 'https://projekcik-prz.azurewebsites.net';

export default class NoteService {
  static sendNote() {
    return axios.post(`${API_URL}/api/Notes/create`).then(r => r.data);
  }

  static getUserNotes(userId) {
    return axios.get(`${API_URL}/api/Notes/${userId}`).then(r => r.data);
  }

  static getAllNotes() {
    return axios.get(`${API_URL}/api/Notes/search`).then(r => r.data);
  }

  static downloadRequest(noteId) {
    return axios
      .get(`${API_URL}/api/Notes/download-request/${noteId}`)
      .then(r => r.data);
  }
}
