import React, { Component } from 'react';
import { Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import './index.scss';
import { withSnackbar } from 'notistack';

class AddToCartButton extends Component {
  state = {
    disabled: CartService.exists(this.props.id),
    open: false
  };

  addToCart = noteID => {
    CartService.add(noteID);
    this.setState({ open: true, disabled: true }, () => {
      this.props.enqueueSnackbar(`Dodano do koszyka`, { variant: 'success' });
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { price, id } = this.props;
    return (
      <Button
        className=" btn cart btn-md px-0 rounded"
        disabled={this.state.disabled}
        onClick={() => this.addToCart(id)}>
        <i className="fa fa-shopping-cart" />
        {price ? (
          <span> {price} zł</span>
        ) : this.state.disabled ? (
          <span> Już w koszyku</span>
        ) : (
          <span> Dodaj do koszyka</span>
        )}
      </Button>
    );
  }
}

export default withSnackbar(AddToCartButton);
