import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PaymentService from '../../Services/PaymentService';
import { Card, Grid, CircularProgress } from '@material-ui/core';
import DownloadNoteCard from '../../Components/NoteCards/downloadNoteCard';

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
      PaymentService.getOrderDetails(this.props.match.params.id).then(x => {
        this.setState({
          transaction: x,
          loaded: true
        });
      });
    }, 3000);
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
          Przejdz do{' '}
          <Link
            to={{
              pathname: '/protected'
            }}>
            panelu użytkownika
          </Link>
          , aby dowiedzieć się więcej.
        </p>

        {transaction.notes.map((x, i) => (
          <Grid item key={i} className="grid-item-note">
            <DownloadNoteCard note={x} key={i} />
          </Grid>
        ))}
      </Card>
    );
  }
}
