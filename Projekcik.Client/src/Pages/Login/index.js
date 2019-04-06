import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../AuthService';

/* TODO:
        - rozwinac ogolna funkcjonalnosc
        - wyswietlanie errorow w przypadku BadRequest
        - auto-login z FB(?)
        - handleChange zmodyfikowac
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
        <h1>Login Page v.Alpha</h1>
        <br />
        <TextField
          id="emailAddress"
          label="Email Address"
          value={this.state.emailAddress}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <TextField
          id="password"
          type="password"
          label="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <br />
        <br />
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
