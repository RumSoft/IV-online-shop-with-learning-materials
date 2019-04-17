import React, { Component } from 'react';
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import AccountIcon from '@material-ui/icons/AccountBox';
import LogOutIcon from '@material-ui/icons/TransferWithinAStation';
import LoginIcon from '@material-ui/icons/Person';
import RegisterIcon from '@material-ui/icons/GroupAdd';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/AddShoppingCart';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import './index.scss';
import APIService from '../../Services/APIService';
import SearchBar from '../SearchBar';
import logo from './logoWhite.png';

export default class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    let isLogged = APIService.isAuthenticated() ? true : false;
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3">
          <Container>
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="ShopLogo" width="200" height="60" />
            </NavbarBrand>
            <SearchBar />
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem hidden={isLogged}>
                  <NavLink tag={Link} to="/">
                    <button className="btn btn-light my-2 my-sm-0">
                      <AddIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink tag={Link} to="/">
                    <button className="btn btn-light my-2 my-sm-0">
                      <MailIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink tag={Link} to="/">
                    <button className="btn btn-light my-2 my-sm-0">
                      <NotificationsIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={isLogged}>
                  <NavLink tag={Link} to="/register">
                    <button className="btn btn-light my-2 my-sm-0">
                      <RegisterIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={isLogged}>
                  <NavLink tag={Link} to="/login">
                    <button className="btn btn-light my-2 my-sm-0">
                      <LoginIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink tag={Link} className="text-dark" to="/protected">
                    <button className="btn btn-light my-2 my-sm-0">
                      <AccountIcon />
                    </button>
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink tag={Link} className="text-dark" to="/logout">
                    <button className="btn btn-light my-2 my-sm-0">
                      <LogOutIcon />
                    </button>
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
