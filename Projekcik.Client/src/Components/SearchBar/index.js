import React, { Component } from 'react';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
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
      <form className="form-inline container">
        <input
          className="form-control mr-sm-2 item"
          type="search"
          placeholder="Wyszukaj notatki..."
        />
        <button className="btn btn-light my-2 my-sm-0" type="submit">
          Szukaj
        </button>
        <button className="btn btn-light my-2 my-sm-0">
          <MailIcon />
        </button>
        <button className="btn btn-light my-2 my-sm-0">
          <NotificationsIcon />
        </button>
      </form>
    );
  }
}

export default SearchBar;
