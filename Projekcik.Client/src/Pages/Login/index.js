import React, { Component } from 'react';
import './index.scss';
import LoginPanel from '../../Components/LoginPanel';

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-page">
        <LoginPanel />
      </div>
    );
  }
}
