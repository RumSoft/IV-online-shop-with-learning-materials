import React, { Component } from 'react';
import { Card, CardContent, Button, LinearProgress } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

import './index.scss';
import { AuthService } from '../../Services';
import { Redirect } from 'react-router-dom';
import HrLabel from '../HrLabel';
import MyTextField from '../MyTextField';

export default class LoginPanel extends Component {
  state = {
    emailAddress: '',
    password: '',
    errorMessage: null,
    loading: false,
    logged: AuthService.isAuthenticated()
  };
  forms = {};
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleLogin = event => {
    let forms = Object.keys(this.forms).map(key => this.forms[key]);
    let isValid = forms.every(x => x.isValid());
    if (!isValid) {
      this.setState({
        errorMessage: 'Wypełnij poprawnie wszystkie pola',
        loading: false
      });
      return;
    }

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
    return <Redirect to={this.props.redirectData || '/protected'} />;
  }

  render() {
    if (this.state.logged) return this.redirect();
    return (
      <div>
        {this.props.redirectData && (
          <Card className="login-panel-redirect mb-3 p-3 bg-warning">
            <span>Musisz być zalogowany aby przejść do tej strony</span>
          </Card>
        )}
        <Card className="login-panel">
          {this.state.loading && <LinearProgress className="progress" />}
          {this.state.errorMessage && (
            <div className="errors">{this.state.errorMessage}</div>
          )}
          <CardContent style={{ width: '100%' }}>
            <h3>Zaloguj się</h3>
            <hr />
            <form className="login-form" onSubmit={this.handleLogin}>
              <MyTextField
                ref={r => {
                  this.forms.emailForm = r;
                }}
                id="emailAddress"
                className="field"
                label="Adres e-mail"
                inputProps={{ maxLength: 30 }}
                variant="outlined"
                showError={this.state.errorMessage}
                value={this.state.emailAddress}
                onChange={this.handleChange}
                validationRules={[
                  {
                    func: val => val,
                    message: 'E-mail jest wymagany'
                  },
                  {
                    func: val =>
                      /*eslint no-control-regex: "off"*/
                      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                        val
                      ),
                    message: 'Nieprawidłowy format'
                  }
                ]}
              />
              <MyTextField
                ref={r => {
                  this.forms.passwordForm = r;
                }}
                id="password"
                className="field"
                label="Hasło"
                variant="outlined"
                type="password"
                showError={this.state.errorMessage}
                inputProps={{ maxLength: 50 }}
                value={this.state.password}
                onChange={this.handleChange}
                validationRules={[
                  {
                    func: val => val,
                    message: 'Hasło jest wymagane'
                  },
                  {
                    func: val => /^(?=.{6,})/.test(val),
                    message: 'Hasło powinno mieć min. 6 znaków'
                  }
                ]}
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
      </div>
    );
  }
}
