export default class CartService {
  noteArray = [];
  static addNoteToCart(noteID) {
    this.noteArray.push(noteID);
    window.localStorage.setItem('cartnotes', JSON.stringify(this.noteArray));
  }

  static getCartNotes() {
    return JSON.parse(window.localStorage.getItem('cartnotes'));
  }

  static removeNoteFromCart(noteID) {
    this.noteArray = JSON.parse(window.localStorage.getItem('cartnotes'));
    for (var i = 0; i < this.noteArray.length; i++) {
      if (this.noteArray[i] === noteID) {
        this.noteArray.splice(i, 1);
        i--;
        break;
      }
    }
    window.localStorage.setItem('cartnotes', JSON.stringify(this.noteArray));
  }

  static clearNoteCart() {
    window.localStorage.removeItem('cartnotes');
  }
}
