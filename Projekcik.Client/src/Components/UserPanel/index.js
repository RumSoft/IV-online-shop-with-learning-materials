import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import NoteService from '../../Services/NoteService';
import HrLabel from '../HrLabel/index';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Card, Typography, ListItemText } from '@material-ui/core';
import { WideSmallNoteCard } from '../NoteCards';
import './index.scss';

export class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      // boughtNotes: [],
      loaded: false
    };
    APIService.get('api/user/me').then(user => {
      this.setState({ user }, () =>
        NoteService.getUserNotes(this.state.user.id).then(r =>
          this.setState({ notes: r, loaded: true })
        )
      );
    });
    // NoteService.getBoughtNote().then(data =>
    //   this.setState({ boughtNotes: data })
    // );
  }

  componentDidMount() {}

  handlePayout() {
    PaymentService.payout('12312412412');
  }

  render() {
    const user = this.state.user;
    const notes = this.state.notes;
    // const boughtNotes = this.state.boughtNotes;
    return (
      <div className="user-panel">
        {this.state.loaded && (
          <Card className="user-data mx-auto p-3">
            <Typography
              component="h1"
              className="title mx-auto"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              {user.name}
            </Typography>
            <h2 className="text-center m-3">
              {' '}
              <i className="fa fa-cog fa-spin" />
              Witaj <img src="http://placekitten.com/50/50" alt="photo" />{' '}
              {user.userName} w swoim panelu użytkownika!
            </h2>
            <HrLabel className="m-5" text="Podgląd informacji" />

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
                        className="btn bg-success btn-buy"
                        onClick={() => this.handlePayout()}>
                        <Grid container>
                          <Grid item xs={0} sm={5} className="text-right">
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
            <HrLabel className="m-5" text="Notatki" />
            <h2 className="p-3">
              <i class="fa fa-book-reader" /> Moje notatki:{' '}
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

            <h2 className="p-3">
              <i class="fa fa-sync-alt fa-spin  " /> Historia zakupów:
            </h2>
            <i class="fa fa-spinner fa-pulse" />
          </Card>
        )}
      </div>
    );
  }
}

export default UserPanel;
