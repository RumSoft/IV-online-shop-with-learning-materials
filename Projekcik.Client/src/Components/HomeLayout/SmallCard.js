import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Card, Typography, Snackbar, SnackbarContent } from '@material-ui/core';
import CartService from '../../Services/CartService';
import './index.scss';

export default class SmallCard extends React.Component {
  state = {
    redirect: null,
    renderSnackbar: false,
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ open: false });
  };

  redirectToNote = id => {
    this.setState({ redirect: `/note/${id}` });
  };

  addToCart = noteID => {
    CartService.addNoteToCart(noteID);
    this.setState({ open: true });
  };

  render() {
    const { note } = this.props;
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    return (
      <Card className="note-card p-2 m-2">
        <div className="note-name">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <h5>{note.name}</h5>
          </Link>
        </div>
        <div className="note-small-info">
          <dl>
            <Typography>Województwo: {note.voivodeship.name}</Typography>
            <Typography />
            <Typography>Uczelnia: {note.university.name}</Typography>
            <Typography />
            <Typography>
              Kierunek: {note.course.name}, sem. {note.semester}
            </Typography>
            <Typography />
          </dl>
        </div>
        <div className="btn-small-group">
          <Button
            className="btn note btn-md rounded-right"
            onClick={() => this.redirectToNote(note.id)}>
            <i className="fa fa-book-open" />
            <span> Zobacz </span>
          </Button>
          <Button
            className="btn cart btn-md rounded-left rounded-right"
            disabled={CartService.exists(note.id)}
            onClick={() => this.addToCart(note.id)}>
            <i className="fa fa-shopping-cart" />
            <span> {note.price} zł</span>
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
      </Card>
    );
  }
}
