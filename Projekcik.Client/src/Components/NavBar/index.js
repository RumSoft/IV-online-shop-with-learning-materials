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

import Badge from '@material-ui/core/Badge';

import AccountIcon from '@material-ui/icons/AccountBox';
import LogOutIcon from '@material-ui/icons/TransferWithinAStation';
import HomePageIcon from '@material-ui/icons/Home';
import LoginIcon from '@material-ui/icons/Person';
import RegisterIcon from '@material-ui/icons/GroupAdd';
import ShopIcon from '@material-ui/icons/ShoppingCart';
import AddIcon from '@material-ui/icons/Add';
import { Link } from 'react-router-dom';
import './index.scss';
import SearchBar from '../SearchBar';
import logo from './logoWhite.png';
import { Tooltip } from '@material-ui/core';
import { AuthService, CartService } from '../../Services';
import CookieNoticeBar from '../CookieNoticeBar';

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

  componentWillMount() {
    CartService.registerForCartUpdate(this);
  }

  render() {
    let isLogged = AuthService.isAuthenticated() ? true : false;
    const menu = [
      {
        name: 'Strona główna',
        to: '/',
        icon: <HomePageIcon className="mobile-icon" />,
        hidden: false
      },
      {
        name: 'Dodaj notatkę',
        to: '/upload',
        icon: <AddIcon className="mobile-icon" />,
        hidden: false
      },
      {
        name: 'Załóż konto',
        to: '/register',
        icon: <RegisterIcon className="mobile-icon" />,
        hidden: isLogged
      },
      {
        name: 'Zaloguj się',
        to: '/login',
        icon: <LoginIcon className="mobile-icon" />,
        hidden: isLogged
      },
      {
        name: 'Wyloguj się',
        to: '/logout',
        icon: <LogOutIcon className="mobile-icon" />,
        hidden: !isLogged
      },
      {
        name: 'Panel użytkownika',
        to: '/userpanel',
        icon: <AccountIcon className="mobile-icon" />,
        hidden: !isLogged
      }
    ];
    return (
      <header>
        <CookieNoticeBar />
        <Navbar
          className="navbar navbar-expand-md navbar-toggleable-md border-bottom box-shadow mb-3"
          dark>
          <Container className="navbar-container">
            {/* first element only for equal flex spacing */}
            <NavbarToggler onClick={this.toggle} className="hidden-toggler" />
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="ShopLogo" className="navbar-logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse
              className="d-md-inline-flex flex-md-row-reverse form-inline container"
              isOpen={this.state.isOpen}
              navbar>
              <ul className="navbar-nav flex-grow ">
                <SearchBar className="nav-search" />
                <NavItem>
                  <NavLink tag={Link} to="/cart" className="text-dark">
                    <div className="d-none d-md-block button btn btn-default">
                      <Tooltip title="Koszyk">
                        <Badge
                          className="mobile-badge"
                          badgeContent={CartService.count()}
                          showZero={false}
                          color="secondary">
                          <ShopIcon className="mobile-shopicon" />
                        </Badge>
                      </Tooltip>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/cart" className="text-white">
                    <div
                      className="d-md-none link"
                      onClick={() => this.toggle()}>
                      <Badge
                        className="mobile-badge"
                        badgeContent={CartService.count()}
                        showZero={false}
                        color="secondary">
                        <ShopIcon className="mobile-shopicon" />
                      </Badge>
                      <span className="mobile-shop"> Plecak pełen keszu</span>
                    </div>
                  </NavLink>
                </NavItem>
                {menu.map((x, i) => (
                  <NavItem key={i} hidden={x.hidden}>
                    <NavLink tag={Link} className="text-white" to={x.to}>
                      <div
                        className="d-md-none link"
                        onClick={() => this.toggle()}>
                        {/* mobile */}
                        {x.icon}
                        <span>{x.name}</span>
                      </div>
                      <div className="d-none d-md-block button btn btn-default">
                        {/* large */}
                        <Tooltip title={x.name}>{x.icon}</Tooltip>
                      </div>
                    </NavLink>
                  </NavItem>
                ))}
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
