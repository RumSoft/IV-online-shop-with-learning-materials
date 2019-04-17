import React, { Component } from 'react';

import './index.scss';

export class SearchBar extends Component {
  render() {
    return (
      <form class="form-inline container">
        <input
          class="form-control mr-sm-2 item"
          type="search"
          placeholder="Wyszukaj notatki..."
        />
        <button className="btn btn-light my-2 my-sm-0" type="submit">
          Szukaj
        </button>
      </form>
    );
  }
}

export default SearchBar;
