import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Card } from '@material-ui/core';
import AuthService from '../../Services/AuthService';
import './index.scss';

export class LogoutPage extends Component {
  state = {
    redirectNow: false
  };

  render() {
    AuthService.logout();

    setTimeout(() => {
      this.setState({ redirectNow: true });
    }, 2000);

    if (this.state.redirectNow) return <Redirect to="/" />;

    return (
      <div className="logged-out-page">
        <Card className="logged-out-page-card">
          <h3>Wylogowano pomyślnie!</h3>
          <p>Zostaniesz przekierowany na stronę główną</p>
          <hr />
          <p>
            w razie braku przekierowania kliknij <a href="/">tutaj</a>
          </p>
        </Card>
      </div>
    );
  }
}

export default LogoutPage;
