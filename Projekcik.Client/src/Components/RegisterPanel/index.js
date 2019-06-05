import React, { Component } from 'react';
import { Button, Card, CardContent, LinearProgress } from '@material-ui/core';
import AuthService from '../../Services/AuthService';
import './index.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import MyTextField from '../MyTextField';
import { Link } from 'react-router-dom';

export default class RegisterPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errorMessage: null,
    loading: false,
    captchaValue: null
  };
  forms = {};

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event && event.preventDefault();

    let forms = Object.keys(this.forms).map(key => this.forms[key]);
    let isValid = forms.every(x => x.isValid());
    if (!isValid) {
      this.setState({
        errorMessage: 'Wypełnij poprawnie wszystkie pola',
        loading: false
      });
      return;
    }

    if (!this.state.captchaValue) {
      this.setState({
        errorMessage: 'Jesteś robotem!',
        loading: false
      });
      return;
    }

    this.setState({
      loading: true
    });
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + '//' + getUrl.host;

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: 'Niezgodne hasła!',
        loading: false
      });
      return;
    }

    AuthService.register({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      userName: this.state.userName,
      emailAddress: this.state.emailAddress,
      password: this.state.password
    })
      .then(() => window.localStorage.removeItem('auth_token'))
      .then(() => (window.location.href = `${baseUrl}/login`))
      .catch(error => {
        this.setState({
          errorMessage: error.response.data.message,
          loading: false
        });
      });
  };

  onCaptchaExpired = event => {
    this.setState({
      captchaValue: null
    });
  };

  onCaptchaChange = event => {
    this.setState({
      captchaValue: event
    });
  };

  render() {
    const { showTitle, title } = this.props;
    return (
      <Card className="register-panel">
        {this.state.loading && <LinearProgress className="progress" />}
        {this.state.errorMessage && (
          <div className="errors">{this.state.errorMessage}</div>
        )}
        <CardContent>
          <form className="register-form" onSubmit={this.handleSubmit}>
            {showTitle && (
              <div className="header">
                <h3>{title}</h3>
                <hr />
              </div>
            )}
            <MyTextField
              ref={r => {
                this.forms.firstName = r;
              }}
              id="firstName"
              className="field"
              label="Imię"
              variant="outlined"
              showError={this.state.errorMessage}
              inputProps={{ maxLength: 30 }}
              value={this.state.firstName}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Imię jest wymagane'
                },
                {
                  func: val => /^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$/.test(val),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              ref={r => {
                this.forms.lastName = r;
              }}
              id="lastName"
              className="field"
              showError={this.state.errorMessage}
              label="Nazwisko"
              variant="outlined"
              inputProps={{ maxLength: 30 }}
              value={this.state.lastName}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Nazwisko jest wymagane'
                },
                {
                  func: val => /^[a-zA-Z]+$/.test(val),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              ref={r => {
                this.forms.userName = r;
              }}
              id="userName"
              className="field"
              label="Nazwa Użytkownika"
              variant="outlined"
              showError={this.state.errorMessage}
              inputProps={{ maxLength: 30 }}
              value={this.state.userName}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Nazwa użytkownika jest wymagana'
                }
              ]}
            />
            <MyTextField
              ref={r => {
                this.forms.emailAddress = r;
              }}
              id="emailAddress"
              className="field"
              showError={this.state.errorMessage}
              label="Adres e-mail"
              inputProps={{ maxLength: 30 }}
              variant="outlined"
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
                this.forms.password = r;
              }}
              id="password"
              className="field"
              label="Hasło"
              showError={this.state.errorMessage}
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 30 }}
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
            <MyTextField
              ref={r => {
                this.forms.confirmPassword = r;
              }}
              id="confirmPassword"
              className="field"
              showError={this.state.errorMessage}
              label="Potwierdź hasło"
              variant="outlined"
              type="password"
              inputProps={{ maxLength: 30 }}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Potwierdzenie hasła jest wymagane'
                },
                {
                  func: val => /^(?=.{6,})/.test(val),
                  message: 'Hasło powinno mieć min. 6 znaków'
                }
              ]}
            />

            <ReCAPTCHA
              sitekey="6LcJq6QUAAAAALUopg2VSs4evUII1XmMH159bRFl"
              onChange={this.onCaptchaChange}
              onExpired={this.onCaptchaExpired}
            />

            <Button
              type="submit"
              className="button-submit"
              variant="contained"
              color="primary"
              onClick={this.handleSubmit}>
              Zarejestruj
            </Button>
          </form>
          <p>
            Masz już konto?&nbsp;
            <Link to="/login">Zaloguj się</Link>{' '}
          </p>
        </CardContent>
      </Card>
    );
  }
}
