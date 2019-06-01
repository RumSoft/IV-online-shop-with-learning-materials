import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaymentService from '../../Services/PaymentService';
import { Card, Grid, CircularProgress } from '@material-ui/core';
import DownloadNoteCard from '../../Components/NoteCards/downloadNoteCard';
import { CartService } from '../../Services';

export default class OrderDetails extends Component {
  constructor() {
    super();
    this.state = {
      loaded: false,
      id: 1
    };
  }
  componentWillMount() {
    setTimeout(() => {
      PaymentService.getOrderDetails(this.props.match.params.id)
        .then(x => {
          this.removeNotesFromCart(x.notes);
          this.setState({
            transaction: x,
            loaded: true
          });
        })
        .catch(x =>
          this.setState({
            transaction: {
              status: 0
            },
            loaded: true
          })
        );
    }, 1);
  }

  removeNotesFromCart(notes) {
    notes.map(x => CartService.remove(x.id));
  }

  render() {
    const { loaded, transaction } = this.state;

    if (!loaded) return <CircularProgress />;

    if (transaction.status <= 0)
      // 4 is completed payment xd
      return <p>przetwarzanie lub błąd transakcji:{transaction.status}</p>;

    return (
      <Card className="p-3">
        <h4>
          <i className="fa fa-book-reader" />
          Zakupiono notatki:{' '}
        </h4>
        <p>Status: płatność zakończona </p>
        <p>
          Zakupione notatki można pobrać także w{' '}
          <Link
            to={{
              pathname: '/protected'
            }}>
            panelu użytkownika
          </Link>
          .
        </p>

        {transaction.notes.map((x, i) => (
          <Grid item md={4} key={i} className="grid-item-note">
            <DownloadNoteCard note={x} key={i} />
          </Grid>
        ))}
      </Card>
    );
  }
}
