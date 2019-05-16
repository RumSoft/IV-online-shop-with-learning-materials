import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './index.scss';

export class SearchBar extends Component {
  state = {
    query: '',
    redirect: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  renderRedirect = () => {
    return this.state.redirect ? (
      <Redirect
        push
        to={{
          pathname: '/search',
          search: window.location.search
        }}
      />
    ) : null;
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    return (
      <form
        className="form-inline container mobile"
        onSubmit={this.setRedirect}>
        {this.renderRedirect()}
        <input
          name="query"
          className="form-control mr-sm-2 item mobile"
          type="search"
          placeholder="Wyszukaj notatkę..."
          onChange={this.handleChange}
          value={this.state.query}
        />
        <button className="btn btn-light ">Szukaj</button>
      </form>
    );
  }
}

export default SearchBar;
