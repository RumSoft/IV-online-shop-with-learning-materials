import NoteService from './NoteService';

const _cart = 'cart_notes';

export default class CartService {
  static addNoteToCart(noteID) {
    if (!this.exists(noteID)) this.set([...this.get(), noteID]);
  }

  static getNotes() {
    let noteIDs = this.get();
    if (noteIDs && noteIDs.length)
      return NoteService.getNotesById(noteIDs).then(x => x);
    return this.emptyPromise([]);
  }

  static count() {
    return this.get().length;
  }

  static remove(noteID) {
    this.set(this.get().filter(x => x !== noteID));
  }

  static exists(noteID) {
    return this.get().includes(noteID);
  }

  static clear() {
    window.localStorage.removeItem(_cart);
  }

  static get() {
    let cart = localStorage[_cart];
    if (!cart) return [];

    let cartItems = JSON.parse(cart);
    if (!cartItems || cartItems.length === 0) return [];

    return cartItems;
  }

  static set(newCart) {
    localStorage[_cart] = JSON.stringify(newCart);
  }

  // this is needed because
  // app uses return getCartNotes().then(x => ...)
  static emptyPromise(val = null) {
    return new Promise(resolve => {
      resolve(val);
    });
  }
}
