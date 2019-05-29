import React, { Component } from 'react';
import { Card, Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
import { PaymentService } from '../../../Services';
import './index.scss';

export default class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    PaymentService.getPaymentHistory().then(payments => {
      if (!payments || payments.length === 0) this.setState({ payments: [] });
      this.setState({ payments });
      console.log(payments);
    });
  }

  state = {
    payments: []
  };

  render() {
    const { payments } = this.state;
    console.log(payments);
    return (
      <Card className="p-2 m-2">
        <Typography variant="h5" className="p-2 m-2">
          Historia zamówień
        </Typography>
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
                  <td>{payment.status}</td>
                  <td>payment.price(?)</td>
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
      </Card>
    );
  }
}
