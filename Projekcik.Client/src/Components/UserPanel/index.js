import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import NoteService from '../../Services/NoteService';
import { Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import { Card, Typography } from '@material-ui/core';
import PaymentHistory from './PaymentHistory';
import UserEarnings from './UserEarnings';
import './index.scss';
import BoughtNotes from './boughtNotes';
import MyNotes from './myNotes';
import MyInfo from './myInfo';
import queryString from 'query-string';

export class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      loaded: false,
      activeTab: 0
    };

    console.log(this.state);
    APIService.get('api/user/me').then(user => {
      this.setState({ user }, () =>
        NoteService.getUserNotes(this.state.user.id).then(r =>
          this.setState({ notes: r, loaded: true })
        )
      );
    });
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  componentDidMount() {}

  handlePayout() {
    PaymentService.payout('12312412412');
  }

  render() {
    const user = this.state.user;
    const notes = this.state.notes;

    const tabs = [
      {
        name: 'Moje dane',
        object: <MyInfo user={user} />
      },
      {
        name: 'Moje notatki',
        object: <MyNotes notes={notes} />
      },
      {
        name: 'Kupione notatki',
        object: <BoughtNotes />
      },
      {
        name: 'Moja sprzedaż',
        object: <UserEarnings />
      },
      {
        name: 'Historia transakcji',
        object: <PaymentHistory />
      }
    ];

    return (
      <div className="user-panel">
        {this.state.loaded && (
          <Card className="user-data mx-auto p-3 p-sx-0">
            <Typography
              component="h1"
              className="title mx-auto"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              {user.name}
            </Typography>
            <h2 className="text-center m-4 ">
              {' '}
              <i className="fa fa-cog fa-spin" />
              Witaj{' '}
              <img
                className="img-fluid rounded-circle"
                src="http://placekitten.com/50/50"
                alt="profile-pic"
              />{' '}
              {user.userName} w swoim panelu użytkownika!
            </h2>

            <Nav tabs>
              {tabs.map((tab, i) => (
                <NavItem className="nav-tab">
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === i
                    })}
                    onClick={() => {
                      this.toggle(i);
                    }}>
                    {tab.name}
                  </NavLink>
                </NavItem>
              ))}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {tabs.map((tab, i) => (
                <TabPane tabId={i} className="mb-2">
                  {tab.object}
                </TabPane>
              ))}
            </TabContent>
          </Card>
        )}
      </div>
    );
  }
}

export default UserPanel;
