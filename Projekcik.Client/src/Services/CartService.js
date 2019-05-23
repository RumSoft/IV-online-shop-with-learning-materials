import NoteService from './NoteService';

const cart = 'cartnotes';
export default class CartService {
  static addNoteToCart(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem(cart) || '[]') || [];
    noteArray.push(noteID);
    window.localStorage.setItem('cartnotes', JSON.stringify(noteArray));
  }

  static getCartNotes() {
    let noteIDs = JSON.parse(window.localStorage.getItem(cart) || '[]') || [];
    if (noteIDs && noteIDs.length)
      return NoteService.getNotesById(noteIDs).then(x => x);
    return this.emptyPromise([]);
  }

  static cartNoteCount() {
    let noteIDs = JSON.parse(window.localStorage.getItem(cart) || '[]') || [];
    if (noteIDs && noteIDs.length) return noteIDs.length;
    return 0;
  }

  static removeNoteFromCart(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem(cart) || '[]') || [];
    for (var i = 0; i < noteArray.length; i++) {
      if (noteArray[i] === noteID) {
        noteArray.splice(i, 1);
        i--;
        break;
      }
    }
    window.localStorage.setItem(cart, JSON.stringify(noteArray));
  }

  static checkDuplicate(noteID) {
    let noteArray = JSON.parse(window.localStorage.getItem(cart) || '[]') || [];
    return noteArray.includes(noteID) ? true : false;
  }

  static clearNoteCart() {
    window.localStorage.removeItem(cart);
  }

  static emptyPromise(val = null) {
    return new Promise(resolve => {
      resolve(val);
    });
  }
}
