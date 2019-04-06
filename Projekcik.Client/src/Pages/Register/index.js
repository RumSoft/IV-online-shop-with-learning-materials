import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AuthService from '../../AuthService';

  /* TODO:
            - potwierdzenie hasla
            - wyswietlanie errorow w przypadku BadRequest
            - redirect do loginu
            - jakis przycisk na auto-login z FB
            - handleChange troche inaczej zeby nie zczytywal z id
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
    event.preventDefault();
    AuthService.register(this.state);
  };

  render() {
    return (
      <form className="register-form" onSubmit={this.handleSubmit}>
        <h1>Register Page v.Alpha</h1>
        <br />
        <TextField
          id="firstName"
          label="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <TextField
          id="lastName"
          label="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <TextField
          id="userName"
          label="User Name"
          value={this.state.userName}
          onChange={this.handleChange}
        />
        <br />
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
          Submit
        </Button>
      </form>
    );
  }
}
