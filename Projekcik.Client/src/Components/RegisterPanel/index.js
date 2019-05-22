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

export default class RegisterPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    userName: '',
    emailAddress: '',
    password: '',
    confirmPassword: '',
    errorMessage: null,
    loading: false
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
            <TextField
              id="firstName"
              className="field"
              label="Imię"
              variant="outlined"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
            <TextField
              id="lastName"
              className="field"
              label="Nazwisko"
              variant="outlined"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
            <TextField
              id="userName"
              className="field"
              label="Nazwa użytkownika"
              variant="outlined"
              value={this.state.userName}
              onChange={this.handleChange}
            />
            <TextField
              id="emailAddress"
              className="field"
              label="Adres e-mail"
              variant="outlined"
              value={this.state.emailAddress}
              onChange={this.handleChange}
            />
            <TextField
              id="password"
              className="field"
              type="password"
              label="Hasło"
              variant="outlined"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <TextField
              id="confirmPassword"
              className="field"
              type="password"
              label="Potwierdź hasło"
              variant="outlined"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
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
