import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../Services/AuthService';
import './index.scss';

/* TODO:
        - rozwinac ogolna funkcjonalnosc
        - wyswietlanie errorow w przypadku BadRequest
        - auto-login z FB(?)
        - SCSSy/efekty z MUI
*/

export default class LoginPage extends Component {
  state = {
    emailAddress: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    AuthService.login(this.state)
        .then(data => window.localStorage.setItem('token', `${data.token}`));
  };

  render() {
    return (
      <form className="login-form" onSubmit={this.handleSubmit}>
        
        <div className="header">
          <h1>Login Page v.Alpha</h1>
        </div>

        <div className="login-field">
          <TextField
            id="emailAddress"
            label="Email Address"
            variant="outlined"
            value={this.state.emailAddress}
            onChange={this.handleChange}
          />
        </div>
        <div className="login-field">
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <Button
          className="submit"
          variant="contained"
          color="primary"
          onClick={this.handleSubmit}>
          Log In
        </Button>
      </form>
    );
  }
}
