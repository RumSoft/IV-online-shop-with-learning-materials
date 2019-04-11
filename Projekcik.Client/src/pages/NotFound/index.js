import React, { Component } from 'react';
import { Card } from '@material-ui/core';
import './index.scss';

export class NotFoundPage extends Component {
  render() {
    let redirectUrl = `${window.location.protocol}//${window.location.host}`;

    setTimeout(() => {
      window.location.href = redirectUrl;
    }, 200000);

    return (
      <div className="not-found-page">
        <Card className="not-found-page-card">
          <h3>Strona nie istnieje!</h3>
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

export default NotFoundPage;
