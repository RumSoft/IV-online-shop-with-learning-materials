import React, { Component } from 'react';
import LoginPanel from '../../Components/LoginPanel';
import queryString from 'query-string';
import AuthService from '../../Services/AuthService';
import './index.scss';

export default class LoginPage extends Component {
  state = {};
  componentWillMount() {
    let params = queryString.parse(this.props.location.hash);
    if (params.access_token) {
      AuthService.facebookLogin(params.access_token).then(data => {
        AuthService.handleLogin(data);
        this.setState({ logged: true });
      });
    }
  }
  render() {
    var redirectData =
      this.props.location.state && this.props.location.state.from;
    return (
      <div className="login-page">
        <LoginPanel redirectData={redirectData} logged={this.state.logged} />
      </div>
    );
  }
}
