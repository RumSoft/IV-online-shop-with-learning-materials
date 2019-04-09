import React, { Component } from 'react';
import RegisterPanel from '../../Components/RegisterPanel';

/* TODO:
            - przycisk na login z FB
            - SCSS/wlasciwosci MUI zeby ladniej wygladalo
  */

export default class RegisterPage extends Component {
  render() {
    const data = {
      showTitle: true,
      title: 'Zarejestruj się'
    };
    return (
      <div className="register-page">
        <RegisterPanel {...data} />
      </div>
    );
  }
}
