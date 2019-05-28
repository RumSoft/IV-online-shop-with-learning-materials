import axios from 'axios';
import APIService from './APIService';
const queryString = require('query-string');

const API_URL = 'https://projekcik-prz.azurewebsites.net';

const authToken = 'auth_token';
export default class NoteService {
  static sendNote(note) {
    let token = window.localStorage.getItem(authToken);
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': `multipart/form-data; boundary=${note._boundary}`
      }
    };
    return axios
      .post(`${API_URL}/api/Notes/create`, note, authHeader)
      .then(r => r.data);
  }

  static getUserNotes(userId) {
    return axios.get(`${API_URL}/api/Notes/user/${userId}`).then(r => r.data);
  }
  static getNote(noteId) {
    return axios.get(`${API_URL}/api/Notes/${noteId}`).then(r => r.data);
  }

  static getNotesById(idArray) {
    return axios.post(`${API_URL}/api/Notes`, idArray).then(r => r.data);
  }

  static getAllNotes(sorter) {
    return sorter
      ? axios.get(`${API_URL}/api/Notes/search/${sorter}`).then(r => r.data)
      : axios.get(`${API_URL}/api/Notes/search`).then(r => r.data);
  }

  static search(data) {
    this.cleanObject(data);
    let dataQueryString = queryString.stringify(data);
    return axios
      .get(`${API_URL}/api/Notes/search?${dataQueryString}`)
      .then(r => r.data);
  }

  static downloadRequest(noteId) {
    return axios
      .get(`${API_URL}/api/Notes/download-request/${noteId}`)
      .then(r => r.data);
  }

  static getUserEarnings() {
    return APIService.get('api/Notes/earnings');
  }

  static cleanObject = function(obj) {
    var propNames = Object.getOwnPropertyNames(obj);
    for (var i = 0; i < propNames.length; i++) {
      var propName = propNames[i];
      if (obj[propName] === null || obj[propName] === undefined) {
        delete obj[propName];
      }
    }
  };
}
