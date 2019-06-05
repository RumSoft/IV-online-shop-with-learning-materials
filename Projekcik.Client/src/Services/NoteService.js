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
    return APIService.get(`api/Notes/user/${userId}`);
  }
  static getNote(noteId) {
    return APIService.get(`api/Notes/${noteId}`);
  }

  static getNotesById(idArray) {
    return APIService.post(`api/Notes`, idArray);
  }

  static getBoughtNotes() {
    return APIService.get('/api/notes/bought');
  }

  static search(data) {
    this.cleanObject(data);
    let dataQueryString = queryString.stringify(data);
    return APIService.get(`api/Notes/search?${dataQueryString}`);
  }

  static downloadRequest(noteId) {
    return APIService.rawGet(`api/Notes/download-request/${noteId}`).then(
      r => r
    );
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
