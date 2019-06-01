import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { Card, Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import ShowNoteButton from '../Buttons/ShowNoteButton';

import './index.scss';
import ShoppingCartItem from './item';
// import PaymentService from '../../Services/PaymentService';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    CartService.getNotes().then(x => this.setState({ notes: x, loaded: true }));
  }

  handleBuy() {
    this.setState({ redirectToBuy: true });
  }

  redirectToOrderPage() {
    return (
      <Redirect
        to={{ pathname: '/order-notes', state: { notes: this.state.notes } }}
      />
    );
  }

  state = {
    loaded: false,
    notes: []
  };

  handleRemove = noteID => {
    CartService.remove(noteID);
    this.setState({
      notes: this.state.notes.filter(x => x.id !== noteID)
    });
  };

  render() {
    const { loaded } = this.state;
    if (this.state.redirectToBuy) return this.redirectToOrderPage();
    return (
      <Paper className="cart-list p-3">
        <Typography variant="h6" className="my-cart">
          Twój koszyk
        </Typography>
        <hr />
        {loaded ? (
          this.state.notes.length ? (
            this.state.notes.map((note, i) => (
              <ShoppingCartItem
                onRemove={this.handleRemove}
                key={i}
                note={note}
              />
            ))
          ) : (
            <div className="empty-cart">Twój koszyk jest pusty :(</div>
          )
        ) : (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}
        <hr />
        <div className="checkout">
          <Typography variant="h6" className="pb-3 mr-2">
            Wartość zamówienia:{' '}
            {Math.round(
              this.state.notes.reduce((y, x) => y + x.price * 100, 0)
            ) / 100}
            zł
          </Typography>
          <Button
            className="btn dollar btn-md"
            onClick={() => this.handleBuy()}
            disabled={this.state.notes.length === 0}>
            <i className="fa fa-dollar-sign" />
            <span> Złóż zamówienie</span>
          </Button>
        </div>
      </Paper>
    );
  }
}
