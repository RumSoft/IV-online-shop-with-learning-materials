import React, { Component } from 'react';
import UserService from '../../Services/UserService';
import NoteService from '../../Services/NoteService';
import { Card, Grid, Typography } from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import NotePanelPlaceholder from '../NotePanel/NotePanelPlaceholder';
import './index.scss';
import { WideSmallNoteCard } from '../NoteCards';

export default class UserPanel2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      filtered: [],
      loaded: false
    };
    UserService.getUser(this.props.id).then(data =>
      this.setState({ user: data, loaded: true }, () =>
        NoteService.getUserNotes(this.props.id).then(r =>
          this.setState({ notes: r })
        )
      )
    );
  }
  render() {
    const notes = this.state.notes;
    const user = this.state.user;
    return (
      <ReactPlaceholder
        ready={this.state.loaded}
        customPlaceholder={<NotePanelPlaceholder />}>
        {this.state.loaded && (
          <Card className="p-3 p-sx-0 user-panel-2">
            <Typography
              component="h1"
              className="title"
              variant="h4"
              color="textPrimary"
              gutterBottom>
              Profil użytkownika {user.userName}
            </Typography>
            <img src="http://placekitten.com/100/100" alt="UserPicture" />

            {notes && notes.length && (
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
            )}
          </Card>
        )}
      </ReactPlaceholder>
    );
  }
}
