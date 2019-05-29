import React, { Component } from 'react';
import {
  Card,
  CardContent,
  TextField,
  Button,
  LinearProgress
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './index.scss';
import { AuthService } from '../../Services';
import { Redirect } from 'react-router-dom';
import HrLabel from '../HrLabel';

export default class LoginPanel extends Component {
  state = {
    emailAddress: '',
    password: '',
    errorMessage: null,
    loading: false,
    logged: AuthService.isAuthenticated()
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLogin = event => {
    this.setState({ errorMessage: null, loading: true });
    AuthService.login({
      emailAddress: this.state.emailAddress,
      password: this.state.password
    })
      .then(data => {
        AuthService.handleLogin(data);
        this.setState({ logged: AuthService.isAuthenticated() });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message,
          loading: false
        });
      });
  };

  handleFacebookLogin = event => {
    let redirect_uri = 'https://projekcik-prz.azurewebsites.net/login';
    let client_id = '416091485634628';
    let url = `https://www.facebook.com/v2.11/dialog/oauth?&response_type=token&display=popup&scope=email&client_id=${client_id}&display=popup&redirect_uri=${redirect_uri}`;
    window.location.href = url;
  };

  redirect() {
    return <Redirect to={this.props.redirectData} />;
  }

  render() {
    if (this.state.logged) return this.redirect();

    return (
      <Card className="login-panel">
        {this.state.loading && <LinearProgress className="progress" />}
        {this.state.errorMessage && (
          <div className="errors">{this.state.errorMessage}</div>
        )}
        <CardContent>
          <h3>Zaloguj się</h3>
          <hr />
          <form className="login-form" onSubmit={this.handleLogin}>
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
              type="password"
              inputProps={{ maxLength: 50 }}
              value={this.state.password}
              onChange={this.handleChange}
            />
          </form>
          <Button
            type="submit"
            className="button login-submit"
            variant="contained"
            color="primary"
            onClick={this.handleLogin}>
            Zaloguj
          </Button>
          <Button
            type="submit"
            className="button login-reset-password"
            variant="contained"
            color="primary"
            disabled>
            Resetuj hasło
          </Button>
          <HrLabel text="LUB" />
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleFacebookLogin}
            className="button login-facebook">
            <Icon className="fab fa-facebook" />
            Zaloguj przez facebooka
          </Button>
        </CardContent>
      </Card>
    );
  }
}
