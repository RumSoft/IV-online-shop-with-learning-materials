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

  render() {
    let isLogged = AuthService.isAuthenticated() ? true : false;
    const menu = [
      {
        name: 'Strona główna',
        to: '/',
        icon: <HomePageIcon />,
        hidden: false
      },
      {
        name: 'Dodaj notatkę',
        to: '/upload',
        icon: <AddIcon />,
        hidden: false
      },
      {
        name: 'Załóż konto',
        to: '/register',
        icon: <RegisterIcon />,
        hidden: isLogged
      },
      {
        name: 'Zaloguj się',
        to: '/login',
        icon: <LoginIcon />,
        hidden: isLogged
      },
      {
        name: 'Wyloguj się',
        to: '/logout',
        icon: <LogOutIcon />,
        hidden: !isLogged
      },
      {
        name: 'Panel użytkownika',
        to: '/protected',
        icon: <AccountIcon />,
        hidden: !isLogged
      }
    ];
    return (
      <header>
        <CookieNoticeBar />
        <Navbar
          className="navbar navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3"
          dark>
          <Container className="navbar-container">
            {/* first element only for equal flex spacing */}
            <NavbarToggler onClick={this.toggle} className="hidden-toggler" />
            <NavbarBrand tag={Link} to="/">
              <img src={logo} alt="ShopLogo" className="navbar-logo" />
            </NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse form-inline container"
              isOpen={this.state.isOpen}
              navbar>
              <ul className="navbar-nav flex-grow ">
                <SearchBar className="nav-search" />
                <NavItem>
                  <NavLink tag={Link} to="/cart" className="text-dark">
                    <div className="d-none d-sm-block button btn btn-default">
                      <Badge
                        badgeContent={CartService.count()}
                        showZero={false}
                        color="secondary">
                        <ShopIcon />
                      </Badge>
                    </div>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} to="/cart" className="text-dark">
                    <div className="d-sm-none link">
                      <Badge
                        badgeContent={CartService.count()}
                        showZero={false}
                        color="secondary">
                        <ShopIcon />
                      </Badge>
                      &nbsp;&nbsp;&nbsp;Plecak pełen keszu
                    </div>
                  </NavLink>
                </NavItem>
                {menu.map((x, i) => (
                  <NavItem key={i} hidden={x.hidden}>
                    <NavLink tag={Link} className="text-dark" to={x.to}>
                      <div className="d-sm-none link">
                        {/* mobile */}
                        {x.icon}
                        <span>{x.name}</span>
                      </div>
                      <div className="d-none d-sm-block button btn btn-default">
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
