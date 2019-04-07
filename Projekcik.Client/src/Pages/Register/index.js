import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../Services/AuthService';
import './index.scss';

  /* TODO:
            - potwierdzenie hasla
            - wyswietlanie errorow w przypadku BadRequest
            - jakis przycisk na auto-login z FB
            - nasrac SCSSami/wlasciwosciami z MUI zeby ladniej wygladalo itd.
  */

export default class RegisterPage extends Component {

  state = {
    firstName: "",
    lastName: "",
    userName: "",
    emailAddress: "",
    password: ""
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    let getUrl = window.location;
    let baseUrl = getUrl.protocol + "//" + getUrl.host;
    event.preventDefault();
    AuthService.register(this.state)
      .then(() => window.location.href = `${baseUrl}/login`);
  };

  
  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>

        <div className="header">
          <h1>Register Page v.Alpha</h1>
        </div>

        <div className="register-field">
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            value={this.state.firstName}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-field">
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            value={this.state.lastName}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-field">
          <TextField
            id="userName"
            label="User Name"
            variant="outlined"
            value={this.state.userName}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-field">
          <TextField
            id="emailAddress"
            label="Email Address"
            variant="outlined"
            value={this.state.emailAddress}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-field">
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
          Submit
        </Button>
      </form>
    );
  }
}
