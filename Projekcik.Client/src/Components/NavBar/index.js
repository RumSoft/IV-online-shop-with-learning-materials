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
import { Link } from 'react-router-dom';
import './index.scss';
import APIService from '../../Services/APIService';
import AuthService from '../../Services/AuthService';

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
  handleClick() {
    AuthService.logout();
  }

  render() {
    let isLogged = APIService.isAuthenticated() ? true : false;
    return (
      <header>
        <Navbar
          className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
          light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              WebApplication1
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="mr-2" />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={this.state.isOpen}
              navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/">
                    Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/counter">
                    Counter
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="text-dark" to="/test">
                    Values
                  </NavLink>
                </NavItem>
                <NavItem hidden={isLogged}>
                  <NavLink tag={Link} className="text-dark" to="/register">
                    Register
                  </NavLink>
                </NavItem>
                <NavItem hidden={isLogged}>
                  <NavLink tag={Link} className="text-dark" to="/login">
                    Login
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink tag={Link} className="text-dark" to="/protected">
                    User Panel
                  </NavLink>
                </NavItem>
                <NavItem hidden={!isLogged}>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/logout"
                    onClick={this.handleClick}>
                    Log Out
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
