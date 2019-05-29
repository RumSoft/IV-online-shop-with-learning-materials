import React, { Component } from 'react';
import { Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import './index.scss';
export default class ShowNoteButton extends Component {
  state = {
    disabled: CartService.exists(this.props.id),
    open: false
  };

  addToCart = noteID => {
    CartService.add(noteID);
    this.setState({ open: true, disabled: true });
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
      <div>
        <Button
          className="btn cart btn-md rounded-left rounded-right px-0"
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
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}>
          <SnackbarContent
            onClose={this.handleClose}
            message="Dodano notatkę do koszyka!"
          />
        </Snackbar>
      </div>
    );
  }
}
