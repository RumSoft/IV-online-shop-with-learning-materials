import React, { Component } from 'react';
import LoginPanel from '../../Components/LoginPanel';
import APIService from '../../Services/APIService';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import AuthService from '../../Services/AuthService';
import './index.scss';

export default class LoginPage extends Component {
  render() {
    let params = queryString.parse(this.props.location.hash);
    if (params.access_token) {
      AuthService.facebookLogin(params.access_token)
        .then(data => AuthService.handleLogin(data))
        .catch(x => console.log(x));
    }

    return APIService.isAuthenticated() ? (
      <Redirect to="/protected" />
    ) : (
      <div className="login-page">
        <LoginPanel />
      </div>
    );
  }
}
