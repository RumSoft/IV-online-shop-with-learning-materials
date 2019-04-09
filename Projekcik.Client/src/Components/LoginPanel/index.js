import React, { Component } from 'react';
import { Card, CardContent, TextField, Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './index.scss';
import AuthService from '../../Services/AuthService';
import HrLabel from '../HrLabel';

export default class LoginPanel extends Component {
  state = {
    emailAddress: '',
    password: '',
    errorMessage: null
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + '//' + getUrl.host;
    event.preventDefault();

    AuthService.login({
      emailAddress: this.state.emailAddress,
      password: this.state.password
    })
      .then(data => {
        window.localStorage.setItem('token', `${data.token}`);
      })
      .then(() => (window.location.href = `${baseUrl}`))
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message
        });
      });
  };

  render() {
    return (
      <Card className="login-panel">
        {this.state.errorMessage && (
          <div className="errors">{this.state.errorMessage}</div>
        )}
        <CardContent>
          <h3>Zaloguj się</h3>
          <hr />
          <form className="login-form" onSubmit={this.handleSubmit}>
            <TextField
              className="field"
              id="emailAddress"
              label="Adres e-mail"
              variant="outlined"
              value={this.state.emailAddress}
              onChange={this.handleChange}
            />
            <TextField
              className="field"
              id="password"
              type="password"
              label="Hasło"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </form>
          <Button
            type="submit"
            className="button login-submit"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}>
            Zaloguj
          </Button>
          <Button
            type="submit"
            className="button login-reset-password"
            variant="contained"
            color="primary"
            disabled
            onClick={this.handleSubmit}>
            Resetuj hasło
          </Button>
          <HrLabel text="LUB" />
          <Button
            variant="contained"
            color="primary"
            disabled
            className="button login-facebook">
            <Icon className="fab fa-facebook" />
            Zaloguj przez facebooka
          </Button>
        </CardContent>
      </Card>
    );
  }
}
