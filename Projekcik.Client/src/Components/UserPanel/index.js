import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import NoteService from '../../Services/NoteService';
import {
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Card,
  Typography
} from '@material-ui/core';
import classnames from 'classnames';
import PaymentHistory from './PaymentHistory';
import UserEarnings from './UserEarnings';
import './index.scss';
import BoughtNotes from './boughtNotes';
import MyNotes from './myNotes';
import MyInfo from './myInfo';

export class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      loaded: false,
      activeTab: 0,
      open: false
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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePayout(accountNumber) {
    PaymentService.payout(accountNumber);
  }

  render() {
    const user = this.state.user;
    const notes = this.state.notes;
    const tabs = [
      {
        name: 'Moje dane',
        object: <MyInfo user={user} handleDialog={this.handleClickOpen} />
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
                <NavItem className="nav-tab" key={i}>
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
                <TabPane tabId={i} key={i} className="mb-2">
                  {tab.object}
                </TabPane>
              ))}
            </TabContent>
          </Card>
        )}
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Wypłać pieniądze</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wypełnij poniższe pola swoimi danymi, aby móc dokonać wypłaty.
              Upewnij się, że dane nie zawierają błędów, po czym zatwierdź
              operację.
            </DialogContentText>
            <hr />
            <Form>
              <FormGroup>
                <Label for="firstName">Imię</Label>
                <Input
                  type="text"
                  id="firstName"
                  placeholder={user.firstName}
                />
              </FormGroup>
              <FormGroup>
                <Label for="lastName">Nazwisko</Label>
                <Input type="text" id="lastName" placeholder={user.lastName} />
              </FormGroup>
              <FormGroup>
                <Label for="accountNumber">Numer konta</Label>
                <Input
                  type="text"
                  id="accountNumber"
                  placeholder="np. 0123 4567 8910 1112 1314 1516 17"
                />
              </FormGroup>
              <FormGroup>
                <Label for="transferTitle">Tytuł przelewu</Label>
                <Input
                  type="text"
                  id="transferTitle"
                  placeholder={`Wypłata dla użytkownika ${user.emailAddress}`}
                />
              </FormGroup>
            </Form>
            <hr />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.handlePayout(
                  document.getElementById('accountNumber').value
                )
              }
              color="primary">
              Zatwierdź
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default UserPanel;
