import NoteService from './NoteService';

export default class CartService {
  static addNoteToCart(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem('cartnotes'));
    noteArray.push(noteID);
    window.localStorage.setItem('cartnotes', JSON.stringify(noteArray));
  }

  static getCartNotes() {
    let noteIDs = JSON.parse(window.localStorage.getItem('cartnotes'));
    return NoteService.getNotesById(noteIDs).then(x => x);
  }

  static cartNoteCount() {
    let noteIDs = JSON.parse(window.localStorage.getItem('cartnotes'));
    return noteIDs.length;
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

  static clearNoteCart() {
    window.localStorage.removeItem('cartnotes');
  }
}
