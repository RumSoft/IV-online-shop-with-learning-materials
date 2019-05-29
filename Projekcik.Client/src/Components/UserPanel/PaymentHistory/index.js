import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
import { PaymentService } from '../../../Services';
import './index.scss';

export default class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    PaymentService.getPaymentHistory().then(payments => {
      if (payments && payments.length > 0)
        this.setState({ payments: payments, loaded: true });
      else this.setState({ payments: [], loaded: true });
    });
  }

  state = {
    payments: [],
    loaded: false
  };

  sumNotesPrices(notes) {
    return notes.reduce((total, note) => total + note.price, 0);
  }

  render() {
    const { payments, loaded } = this.state;
    console.log('render');
    return (
      <div>
        <Typography variant="h5" className="p-2 m-2">
          Historia zamówień
        </Typography>
        <Table responsive striped bordered>
          <thead>
            <tr>
              <th>L.p.</th>
              <th>Data zamówienia</th>
              <th>Status</th>
              <th>Wartość</th>
              <th>Zakupione notatki</th>
            </tr>
          </thead>
          <tbody>
            {loaded &&
              payments &&
              payments.map((payment, idx) => (
                <tr key={idx}>
                  <th scope="row">{idx + 1}.</th>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                  <td>
                    {payment.status > 0 ? 'ZAKOŃCZONE' : 'błąd płatności'}
                  </td>
                  <td>{this.sumNotesPrices(payment.notes)}zł</td>
                  <td>
                    {payment.notes.map((note, index) => (
                      <div>
                        <Link to={`/note/${note.id}`}>{note.name}:</Link>
                        {'  '}
                        {note.price}zł
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
