import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './index.scss';

export class SearchBar extends Component {
  handleSubmit = e => {
    e.preventDefault();
    // let query = document.getElementsByName('query')[0].value;
    // if (query !== '') {
    //   let getUrl = window.location;
    //   let baseUrl = getUrl.protocol + '//' + getUrl.host;
    //   window.location.href = `${baseUrl}/results?=${query}`;
    // }
    return <Route to="/results" />;
  };

  render() {
    return (
      <form className="form-inline container mobile">
        <input
          name="query"
          className="form-control mr-sm-2 item mobile"
          type="search"
          placeholder="Wyszukaj notatki..."
          onChange={this.handleChange}
        />
        <button
          className="btn btn-light "
          type="submit"
          onClick={this.handleSubmit}>
          Szukaj
        </button>
      </form>
    );
  }
}

export default SearchBar;
