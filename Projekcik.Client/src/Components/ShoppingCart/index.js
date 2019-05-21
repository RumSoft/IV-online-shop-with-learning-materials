import React, { Component } from 'react';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { Card, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import CartService from '../../Services/CartService';

import './index.scss';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    CartService.getCartNotes().then(x => {
      this.setState({ notes: x, loaded: true }, () => {
        let sum = 0;
        for (var note of this.state.notes) {
          sum = sum + note.price;
        }
        this.setState({ totalPrice: sum });
      });
    });
  }

  state = {
    loaded: false,
    notes: [],
    totalPrice: 0
  };

  handleRemove = noteID => {
    CartService.removeNoteFromCart(noteID);
    window.location.reload();
  };

  redirectToNote = id => {
    this.setState({ redirect: `/note/${id}` });
  };

  render() {
    const { loaded } = this.state;
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    return (
      <Paper className="cart-list">
        <Typography variant="h5" className="my-cart">
          Twój koszyk
        </Typography>
        <hr />
        {loaded ? (
          this.state.notes.map((note, i) => (
            <Card key={i} className="cart-note p-2 m-2">
              <div className="note-image">
                <img
                  className="p-2 m-2"
                  style={{
                    width: 128,
                    height: 128
                  }}
                  src="http://placekitten.com/g/400/400"
                  alt="notePreview"
                />

                <div className="note-main">
                  <Typography variant="caption" className="pb-2">
                    {note.id}
                  </Typography>
                  <Typography variant="h5" className="name pb-2">
                    {note.name}
                  </Typography>
                  <Typography variant="subtitle2" className="pb-2">
                    <i className="fa fa-user" />
                    &nbsp; {note.author.name}
                  </Typography>
                </div>
                <div className="note-origins">
                  <div className="text">
                    <Typography>
                      <i className="fa fa-globe" />
                      &nbsp; {note.voivodeship.name}
                    </Typography>
                    <Typography>
                      <i className="fa fa-university" />
                      &nbsp; {note.university.name}
                    </Typography>
                    <Typography>
                      <i className="fa fa-book" />
                      &nbsp; {note.course.name}
                    </Typography>
                  </div>
                  <div className="view-note">
                    <button
                      className="btn btn-md"
                      onClick={() => this.redirectToNote(note.id)}>
                      <i className="fa fa-book-open" />
                      <span> Zobacz notatkę</span>
                    </button>
                  </div>
                </div>
                <div className="note-price">
                  <Typography variant="h5" className="pb-3 mr-1">
                    {note.price} zł
                  </Typography>
                  <Button
                    type="button"
                    onClick={() => this.handleRemove(note.id)}
                    className="btn btn-danger btn-circle btn-lg">
                    <i className="fa fa-times" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center">
            <CircularProgress />
          </div>
        )}
        <hr />
        <div className="checkout">
          <Typography variant="h5" className="pb-3 mr-2">
            Wartość zamówienia: {this.state.totalPrice} zł
          </Typography>
          <Button className="btn dollar btn-md">
            <i className="fa fa-dollar-sign" />
            <span> Złóż zamówienie</span>
          </Button>
        </div>
      </Paper>
    );
  }
}
