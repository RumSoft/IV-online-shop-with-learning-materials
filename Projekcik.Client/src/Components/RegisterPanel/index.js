import React, { Component } from 'react';
import {
  TextField,
  Button,
  Card,
  CardContent,
  LinearProgress
} from '@material-ui/core';
import AuthService from '../../Services/AuthService';
import './index.scss';
import ReCAPTCHA from 'react-google-recaptcha';
import MyTextField from '../MyTextField';
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

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    this.setState({
      loading: true
    });
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + '//' + getUrl.host;
    event.preventDefault();

    if (this.state.password !== this.state.confirmPassword) {
      this.setState({
        errorMessage: 'Niezgodne hasła!',
        loading: false
      });
      return;
    }
    if (this.state.captchaValue == null) {
      this.setState({
        errorMessage: 'Jesteś robotem!',
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
              id="firstName"
              className="field"
              label="Imię"
              variant="outlined"
              value={this.state.firstName}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Imię jest wymagane'
                },
                {
                  func: val => /^[a-zA-Z]+$/.test(val),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              id="lastName"
              className="field"
              label="Nazwisko"
              variant="outlined"
              value={this.state.lastName}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Imię jest wymagane'
                },
                {
                  func: val => /^[a-zA-Z]+$/.test(val),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              id="userName"
              className="field"
              label="Nazwa Użytkownika"
              variant="outlined"
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
              id="emailAddress"
              className="field"
              label="Adres e-mail"
              inputProps={{ maxLength: 100 }}
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
                    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
                      val
                    ),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              id="password"
              className="field"
              label="Hasło"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Hasło jest wymagane'
                },
                {
                  func: val => /^(?=.{6,})/.test(val),
                  message: 'Nieprawidłowy format'
                }
              ]}
            />
            <MyTextField
              id="confirmPassword"
              className="field"
              label="Potwierdź hasło"
              variant="outlined"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              validationRules={[
                {
                  func: val => val,
                  message: 'Potwierdzenie hasła jest wymagane'
                },
                {
                  func: val => /^(?=.{6,})/.test(val),
                  message: 'Nieprawidłowy format'
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
            Masz już konto? <a href="../login">Zaloguj się</a>
          </p>
        </CardContent>
      </Card>
    );
  }
}
