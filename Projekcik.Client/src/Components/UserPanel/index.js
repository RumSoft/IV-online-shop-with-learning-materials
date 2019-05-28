import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import PaymentHistory from '../PaymentHistory';
import UserEarnings from '../UserEarnings';

export class UserPanel extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    APIService.get('api/user/me').then(user => {
      this.setState({ user });
    });
  }

  handlePayout() {
    PaymentService.payout('12312412412');
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <p> moje dane</p>
        <pre>{JSON.stringify(user, null, 2)}</pre>
        {user.pictureUrl && <img src={user.pictureUrl} alt={user.username} />}
        <p> wypłać kasę </p>
        <button onClick={() => this.handlePayout()}>
          wypłać {user.balance}zł
        </button>
        <p> notatki zakupione ode mnie: </p>
        <UserEarnings />
        <p> notatki zakupione przeze mnie: </p>
        <PaymentHistory />
        <p> moje notatki:</p>
      </div>
    );
  }
}

export default UserPanel;
