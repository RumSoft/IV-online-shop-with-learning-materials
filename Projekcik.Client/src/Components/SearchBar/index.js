import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './index.scss';

export class SearchBar extends Component {
  state = {
    redirect: false
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/results',
            search: window.location.search
          }}
        />
      );
    }
  };

  setRedirect = () => {
    this.setState({ redirect: true });
  };

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <form className="form-inline container mobile">
          <input
            name="query"
            className="form-control mr-sm-2 item mobile"
            type="search"
            placeholder="Wyszukaj notatki..."
          />
          <button
            className="btn btn-light "
            type="submit"
            onClick={this.setRedirect}>
            Szukaj
          </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
