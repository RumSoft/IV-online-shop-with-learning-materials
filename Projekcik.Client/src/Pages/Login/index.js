import React, { Component } from 'react';
import './index.scss';
import LoginPanel from '../../Components/LoginPanel';

/* TODO:
        - rozwinac ogolna funkcjonalnosc
        - wyswietlanie errorow w przypadku BadRequest
        - auto-login z FB(?)
        - SCSSy/efekty z MUI
*/

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <LoginPanel />
      </div>
    );
  }
}
