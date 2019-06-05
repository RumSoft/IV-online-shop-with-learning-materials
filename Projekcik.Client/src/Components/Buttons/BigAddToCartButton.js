import React, { Component } from 'react';
import { Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import './index.scss';
import { withSnackbar } from 'notistack';

class BigAddToCartButton extends Component {
  state = {
    open: false,
    disabled: false
  };

  addToCart = noteID => {
    CartService.add(noteID);
    this.setState({ open: true, disabled: true }, () => {
      this.props.enqueueSnackbar(`Dodano do koszyka`, { variant: 'success' });
    });
  };

  render() {
    const { price, id } = this.props;

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
          {this.state.disabled ? (
            <p className="label">Już w koszyku</p>
          ) : (
            <p className="label">Dodaj do koszyka</p>
          )}
        </Button>
      </div>
    );
  }
}

export default withSnackbar(BigAddToCartButton);
