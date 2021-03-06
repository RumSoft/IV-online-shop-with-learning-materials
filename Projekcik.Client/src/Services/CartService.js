import NoteService from './NoteService';

const _cart = 'cart_notes';

export default class CartService {
  static toUpdateOnCartModify = [];

  static registerForCartUpdate(ref) {
    this.toUpdateOnCartModify = [...this.toUpdateOnCartModify, ref];
  }

  static updateComponents() {
    this.toUpdateOnCartModify.forEach(x => x.forceUpdate());
  }

  static add(noteID) {
    if (!this.exists(noteID)) {
      this.set([...this.get(), noteID]);
      this.updateComponents();
    }
  }

  static getNotes() {
    let noteIDs = this.get();
    if (noteIDs && noteIDs.length)
      return NoteService.getNotesById(noteIDs).then(x => {
        this.set(x.map(xd => xd.id));
        return x;
      });

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
    this.updateComponents();
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
    this.updateComponents();
  }

  // this is needed because
  // app uses return getCartNotes().then(x => ...)
  static emptyPromise(val = null) {
    return new Promise(resolve => {
      resolve(val);
    });
  }
}
