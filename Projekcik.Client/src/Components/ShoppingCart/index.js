import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { CircularProgress, Paper, Typography } from '@material-ui/core';
import { Card, Button } from 'reactstrap';
import CartService from '../../Services/CartService';
import ShowNoteButton from '../Buttons/ShowNoteButton';

import './index.scss';
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
      <Paper className="cart-list">
        <Typography variant="h6" className="my-cart">
          Twój koszyk
        </Typography>
        <hr />
        {loaded ? (
          this.state.notes.length ? (
            this.state.notes.map((note, i) => (
              <Card key={i} className="cart-note p-2 m-2">
                <div className="note-all">
                  <div className="note-image d-none d-md-block">
                    {note.previewUrl ? (
                      <img
                        className="img- fluid p-2 m-2"
                        style={{
                          width: 128,
                          height: 128
                        }}
                        src={note.previewUrl}
                        alt="notePreview"
                      />
                    ) : (
                      <img
                        className="img-fluid rounded-circle p-2 m-2"
                        src="http://placekitten.com/g/100/100"
                        alt="notePreview"
                      />
                    )}
                  </div>
                  <div className="note-main">
                    <Typography variant="h6" className="name pb-2">
                      {note.name}
                    </Typography>
                    <Typography variant="subtitle2" className="pb-2">
                      <i className="fa fa-user" /> {note.author.name}
                    </Typography>
                  </div>
                  <div className="note-origins">
                    <div className="text">
                      <Typography>
                        <i className="fa fa-globe" /> {note.voivodeship.name}
                      </Typography>
                      <Typography>
                        <i className="fa fa-university" />{' '}
                        {note.university.name}
                      </Typography>
                      <Typography>
                        <i className="fa fa-book" /> {note.course.name}
                      </Typography>
                    </div>
                    <ShowNoteButton
                      className="view-note"
                      id={note.id}
                      text="Zobacz notatkę"
                    />
                  </div>
                  <div className="note-price">
                    <Button
                      type="button"
                      onClick={() => this.handleRemove(note.id)}
                      className="btn btn-danger btn-circle btn-lg">
                      <i className="fa fa-times m-0" /> <h6>{note.price} zł</h6>
                    </Button>
                  </div>
                </div>
              </Card>
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
            {this.state.notes.reduce((total, note) => total + note.price, 0)} zł
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
