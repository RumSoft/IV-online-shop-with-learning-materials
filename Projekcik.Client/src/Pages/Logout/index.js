import React, { Component } from 'react';
import { Card, CardContent } from '@material-ui/core';

export class Logout extends Component {
  render() {
    return (
      <Card className="logged-out">
        <CardContent>
          <p>Wylogowano pomyślnie!</p>
          <a href={`${window.location.protocol}//${window.location.host}`}>
            Powrót na stronę główną
          </a>
        </CardContent>
      </Card>
    );
  }
}

export default Logout;
