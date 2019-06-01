import React, { Component } from 'react';
import PaymentService from '../../Services/PaymentService';
import { CircularProgress, Paper } from '@material-ui/core';
import { CartService } from '../../Services';

export default class OrderNote extends Component {
  state = {
    message: null
  };

  componentDidMount() {
    let noteIds = CartService.get();
    PaymentService.placeOrder(noteIds)
      .then(r => {
        window.location.href = r.redirectUrl;
      })
      .catch(r => {
        this.setState({
          message: 'błąd tworzenia transakcji, spróbuj ponownie'
        });
        setTimeout(() => window.history.back(), 1000);
      });
  }

  render() {
    return (
      <Paper>
        <div className="text-center p-5 d-block">
          {!this.state.message ? (
            <div>
              <CircularProgress />
              <p>zostaniesz przekierowany na stronę obsługi płatności</p>
            </div>
          ) : (
            <p>{this.state.message}</p>
          )}
        </div>
      </Paper>
    );
  }
}
