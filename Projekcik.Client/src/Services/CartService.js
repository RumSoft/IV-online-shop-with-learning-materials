import NoteService from './NoteService';

export default class CartService {
  static addNoteToCart(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem('cartnotes')) || [];
    noteArray.push(noteID);
    window.localStorage.setItem('cartnotes', JSON.stringify(noteArray));
  }

  static getCartNotes() {
    let noteIDs = JSON.parse(window.localStorage.getItem('cartnotes'));
    if (noteIDs && noteIDs.length)
      return NoteService.getNotesById(noteIDs).then(x => x);
    return this.emptyPromise([]);
  }

  static cartNoteCount() {
    let noteIDs = JSON.parse(window.localStorage.getItem('cartnotes'));
    if (noteIDs && noteIDs.length) return noteIDs.length;
    return 0;
  }

  static removeNoteFromCart(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem('cartnotes'));
    for (var i = 0; i < noteArray.length; i++) {
      if (noteArray[i] === noteID) {
        noteArray.splice(i, 1);
        i--;
        break;
      }
    }
    window.localStorage.setItem('cartnotes', JSON.stringify(noteArray));
  }

  static checkDuplicate(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem('cartnotes'));
    return noteArray.includes(noteID) ? true : false;
  }

  static clearNoteCart() {
    window.localStorage.removeItem('cartnotes');
  }

  static emptyPromise(val = null) {
    return new Promise(resolve => {
      resolve(val);
    });
  }
}
