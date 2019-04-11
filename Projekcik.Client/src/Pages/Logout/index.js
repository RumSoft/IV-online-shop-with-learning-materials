import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import AuthService from '../../Services/AuthService';
import './index.scss';

export class LogoutPage extends Component {
  render() {
    AuthService.logout();

    let redirectUrl = `${window.location.protocol}//${window.location.host}`;

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2000);

    return (
      <div className="logged-out-page">
        <Card className="logged-out-page-card">
          <h3>Wylogowano pomyślnie!</h3>
          <p>Zostaniesz przekierowany na stronę główną</p>
          <hr />
          <p>
            w razie braku przekierowania kliknij <a href={redirectUrl}>tutaj</a>
          </p>
        </Card>
      </div>
    );
  }
}

export default LogoutPage;
