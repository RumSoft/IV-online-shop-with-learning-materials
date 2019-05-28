import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import CartService from '../../Services/CartService';
import './index.scss';

export default class ShowNoteButton extends Component {
  state = {
    redirectToCart: null
  };

  addToCart = noteID => {
    CartService.add(noteID);
    this.setState({ redirectToCart: '/cart' });
  };

  render() {
    const { price, id } = this.props;
    if (this.state.redirectToCart)
      return <Redirect to={this.state.redirectToCart} />;
    return (
      <div>
        <Button
          type="submit"
          disabled={CartService.exists(id)}
          className="button submit p-3 mb-2 text-white add-to-cart"
          onClick={() => this.addToCart(id)}>
          <p className="price">
            <i className="fa fa-shopping-cart" />
            <span> {price} zł</span>
          </p>
          <p className="label">Dodaj do koszyka</p>
        </Button>
      </div>
    );
  }
}
