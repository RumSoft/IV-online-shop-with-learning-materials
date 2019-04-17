import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import './index.scss';

export class SearchBar extends Component {
  render() {
    const renderMenu = (
      <Menu>
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );
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
