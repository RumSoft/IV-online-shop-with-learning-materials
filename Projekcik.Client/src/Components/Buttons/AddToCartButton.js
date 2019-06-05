import React, { Component } from 'react';
import { Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import './index.scss';
import { withSnackbar } from 'notistack';

class ShowNoteButton extends Component {
  state = {
    disabled: CartService.exists(this.props.id) || this.props.owned,
    open: false
  };

  addToCart = noteID => {
    CartService.add(noteID);
    this.setState({ open: true, disabled: true }, () => {
      this.props.enqueueSnackbar('Dodano do koszyka', { variant: 'success' });
    });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  render() {
    const { price, id, owned } = this.props;
    return (
      <Button
<<<<<<< Updated upstream
        className=" btn home-cart btn-md px-0 rounded"
        disabled={this.state.disabled}
=======
        className="btn cart btn-md p-0 p-lg-1 rounded"
        disabled={this.state.disabled || owned}
>>>>>>> Stashed changes
        onClick={() => this.addToCart(id)}>
        <i className="fa fa-shopping-cart" />
        {price ? (
          <span> {price} zł</span>
        ) : this.state.disabled ? (
          owned ? (
            <span> Już zakupiono</span>
          ) : (
            <span> Już w koszyku</span>
          )
        ) : (
          <span> Dodaj do koszyka</span>
        )}
      </Button>
    );
  }
}

export default withSnackbar(ShowNoteButton);
