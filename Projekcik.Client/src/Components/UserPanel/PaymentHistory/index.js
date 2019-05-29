import React, { Component } from 'react';
import { Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
import { PaymentService } from '../../../Services';
import './index.scss';

export default class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    PaymentService.getPaymentHistory().then(payments => {
      if (!payments || payments.length === 0) this.setState({ payments: null });
      else this.setState({ payments });
    });
  }

  state = {
    payments: null,
    loaded: false
  };

  render() {
    const { payments } = this.state;
    console.log('payments: ', payments);
    return (
      <div>
        <Typography variant="h5" className="p-2 m-2">
          Historia zamówień
        </Typography>
        {payments !== null ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>L.p.</th>
                <th>Data zamówienia</th>
                <th>ID zamówienia</th>
                <th>Status</th>
                <th>Wartość</th>
                <th>Zakupione notatki</th>
              </tr>
            </thead>
            <tbody>
              {payments &&
                payments.map((payment, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}.</th>
                    <td>{payment.createdAt}</td>
                    <td>payment.id(?)</td>
                    <td>
                      {payment.status === 0 ? (
                        <div>Nieopłacone</div>
                      ) : (
                        <div>Opłacone</div>
                      )}
                    </td>
                    <td>
                      {payment.notes.length > 1 ? (
                        payment.notes.map((note, index) => (
                          <div>- {payment.notes[index].price} zł</div>
                        ))
                      ) : (
                        <div>{payment.notes[0].price} zł</div>
                      )}
                    </td>
                    <td>
                      {payment.notes.length > 1
                        ? payment.notes.map((note, index) => (
                            <div>- {payment.notes[index].name}</div>
                          ))
                        : payment.notes[0].name}
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
