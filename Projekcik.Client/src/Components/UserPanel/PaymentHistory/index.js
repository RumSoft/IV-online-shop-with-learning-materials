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
      else this.setState({ payments: null, loaded: true });
    });
  }

  state = {
    payments: null,
    loaded: false
  };

  sumNotesPrices(notes) {
    return notes.reduce((total, note) => total + note.price, 0);
  }

  render() {
    const { payments, loaded } = this.state;
    return (
      <div>
        <h2 className="p-2 m-2">
          <i className="fa fa-file-invoice-dollar" /> Historia zamówień
        </h2>
        {payments !== null ? (
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
                      {payment.status > 0 ? 'ZAKOŃCZONE' : 'Błąd Płatności'}
                    </td>
                    <td>{this.sumNotesPrices(payment.notes)}zł</td>
                    <td>
                      {payment.notes.map((note, index) => (
                        <div key={index}>
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
        ) : (
          <Typography className="text-center mb-2">
            Nie kupiłeś jeszcze żadnych notatek.
          </Typography>
        )}
      </div>
    );
  }
}
