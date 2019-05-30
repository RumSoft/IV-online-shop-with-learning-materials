import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import NoteService from '../../Services/NoteService';
import { Button, Nav, NavItem, NavLink, TabPane, TabContent } from 'reactstrap';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { Card, Typography, ListItemText } from '@material-ui/core';
import { WideSmallNoteCard } from '../NoteCards';
import PaymentHistory from './PaymentHistory';
import UserEarnings from './UserEarnings';
import './index.scss';
import BoughtNotes from './boughtNotes';
export class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      loaded: false,
      activeTab: 1
    };
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
              Witaj <img
                src="http://placekitten.com/50/50"
                alt="profile-pic"
              />{' '}
              {user.userName} w swoim panelu użytkownika!
            </h2>

            <Nav tabs>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 1
                  })}
                  onClick={() => {
                    this.toggle(1);
                  }}>
                  Moje dane
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 2
                  })}
                  onClick={() => {
                    this.toggle(2);
                  }}>
                  Moje notatki
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 3
                  })}
                  onClick={() => {
                    this.toggle(3);
                  }}>
                  Kupione notatki
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 4
                  })}
                  onClick={() => {
                    this.toggle(3);
                  }}>
                  Sprzedane notatki
                </NavLink>
              </NavItem>
              <NavItem className="nav-tab">
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === 5
                  })}
                  onClick={() => {
                    this.toggle(4);
                  }}>
                  Historia zakupów
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={1} className="mb-2">
                <div className="row m-4">
                  <Grid container>
                    <Grid item md={6}>
                      <Grid item>
                        <ListItemText
                          className="document-what m-3"
                          primary={[
                            <i className="fa fa-user-cog" />,
                            'Twój unikalny id użytkownika'
                          ]}
                          secondary={user.id}
                        />
                      </Grid>
                      <Grid item>
                        <ListItemText
                          className="document-what m-3"
                          primary={[
                            <i className="fa fa-user" />,
                            'Imię i nazwisko użytkownika'
                          ]}
                          secondary={`${user.firstName} ${user.lastName}`}
                        />
                      </Grid>
                      <Grid item>
                        <ListItemText
                          className="document-what m-3"
                          primary={[
                            <i className="fa fa-envelope" />,
                            'Twój adres e-mail'
                          ]}
                          secondary={user.emailAddress}
                        />
                      </Grid>
                    </Grid>
                    <Grid item md={6}>
                      <Grid item>
                        <ListItemText
                          className="document-what m-3"
                          primary={[
                            <i className="fa fa-dollar-sign" />,
                            'Obecny stan konta'
                          ]}
                          secondary={user.balance}
                        />
                      </Grid>
                      <Grid item>
                        <ListItemText
                          className="document-what m-3"
                          primary={[
                            <i className="fa fa-hand-holding-usd" />,
                            'A może chcesz wypłacić swoje pieniądze?'
                          ]}
                        />
                      </Grid>
                      <Grid item>
                        <div className="btn-group">
                          <Button
                            style={{ maxWidth: '400px' }}
                            className="btn bg-success btn-buy"
                            onClick={() => this.handlePayout()}>
                            <Grid container>
                              <Grid item sm={5} className="text-right">
                                <i className=" fa fa-dollar-sign fa-spin d-none d-sm-inline-block" />
                              </Grid>
                              <Grid item xs={12} sm={7} className="text-left">
                                {' '}
                                wypłać całą swoją fortunę
                                <h3>{user.balance} zł</h3>
                              </Grid>
                            </Grid>
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </TabPane>

              <TabPane tabId={2}>
                <h2 className="p-3">
                  <i className="fa fa-book-reader" /> Moje notatki
                </h2>
                <Grid
                  className="grid"
                  container
                  spacing={8}
                  direction="row"
                  justify="flex-start"
                  alignContent="flex-start"
                  alignItems="baseline">
                  {notes.map((note, i) => (
                    <Grid item sm={4} key={i} className="grid-item-note">
                      {note.noteCount <= 0 && <div className="disabled" />}
                      <WideSmallNoteCard note={note} key={i} />
                    </Grid>
                  ))}
                </Grid>
              </TabPane>
              <TabPane tabId={3}>
                <BoughtNotes />
              </TabPane>
              <TabPane tabId={4}>
                <UserEarnings />
              </TabPane>
              <TabPane tabId={5}>
                <PaymentHistory />
              </TabPane>
            </TabContent>
          </Card>
        )}
      </div>
    );
  }
}

export default UserPanel;
