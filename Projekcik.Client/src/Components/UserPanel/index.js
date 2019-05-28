import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import NoteService from '../../Services/NoteService';
import HrLabel from '../HrLabel/index';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography, ListItemText } from '@material-ui/core';
import { isError } from 'util';
import SmallCard from '../UserPanel2/SmallCard';

export class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      notes: [],
      boughtNotes: [],
      loaded: false
    };
    APIService.get('api/user/me').then(user => {
      this.setState({ user }, () =>
        NoteService.getUserNotes(this.state.user.id).then(r =>
          this.setState({ notes: r, loaded: true })
        )
      );
    });
    NoteService.getBoughtNote().then(data =>
      this.setState({ boughtNotes: data })
    );
  }

  componentDidMount() {}

  handlePayout() {
    PaymentService.payout('12312412412');
  }

  render() {
    const user = this.state.user;
    const notes = this.state.notes;
    const boughtNotes = this.state.boughtNotes;
    return (
      <div className="user-panel">
        {this.state.loaded && (
          <Grid container spacing={16}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Card className="note-data">
                <CardContent className="mx-auto">
                  <Typography
                    component="h1"
                    className="title mx-auto"
                    variant="h4"
                    align="center"
                    color="textPrimary"
                    gutterBottom>
                    {user.name}
                  </Typography>

                  <h2>
                    {' '}
                    <i className="fa fa-cog fa-spin" />
                    Witaj {user.userName}{' '}
                    <img src="http://placekitten.com/50/50" alt="photo" /> w
                    swoim panelu użytkownika!
                  </h2>

                  <HrLabel text="Podgląd informacji" />
                  <ListItemText
                    className="document-what"
                    primary={[
                      <i className="fa fa-user-cog" />,
                      'Twój unikalny id użytkownika'
                    ]}
                    secondary={user.id}
                  />
                  <br />
                  <ListItemText
                    className="document-what"
                    primary={[
                      <i className="fa fa-envelope" />,
                      'Twój adres e-mail'
                    ]}
                    secondary={user.emailAddress}
                  />
                  <br />
                  <ListItemText
                    className="document-what"
                    primary={[
                      <i className="fa fa-dollar-sign" />,
                      'Obecny stan konta'
                    ]}
                    secondary={user.balance}
                  />
                  <br />
                  <ListItemText
                    className="document-what"
                    primary={[
                      <i className="fa fa-hand-holding-usd" />,
                      'A może chcesz pieniędzy, biedaku?'
                    ]}
                  />
                  <br />
                  <Button
                    className="btn add-to-cart btn-md rounded-left rounded-right"
                    onClick={() => this.handlePayout()}>
                    <i className="fa fa-dollar-sign fa-spin" />
                    <i className="fa fa-dollar-sign fa-spin" />
                    <br />
                    wypłać {user.balance}zł
                  </Button>
                  <ListItemText
                    className="document-what"
                    primary={[<i className="fa fa-book" />, 'Moje notatki:']}
                  />
                  <br />
                  {notes && notes.length && (
                    <Card className="main p-3">
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
                            {note.noteCount <= 0 && (
                              <div className="disabled" />
                            )}
                            <SmallCard note={note} key={i} />
                          </Grid>
                        ))}
                      </Grid>
                    </Card>
                  )}
                  <h2> Historia zakupów: </h2>
                  <i class="fa fa-spinner fa-pulse" />

                  <Card className="main p-3">
                    <Grid
                      className="grid"
                      container
                      spacing={8}
                      direction="row"
                      justify="flex-start"
                      alignContent="flex-start"
                      alignItems="baseline">
                      {boughtNotes.map((note, i) => (
                        <Grid item sm={4} key={i} className="grid-item-note">
                          <SmallCard note={note} key={i} />
                        </Grid>
                      ))}
                    </Grid>
                  </Card>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </div>
    );
  }
}

export default UserPanel;
