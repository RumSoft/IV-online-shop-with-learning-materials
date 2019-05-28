import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import UserService from '../../Services/UserService';
import NoteService from '../../Services/NoteService';
import { Card, Grid, Paper, Typography } from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import NotePanelPlaceholder from '../NotePanel/NotePanelPlaceholder';

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
      <div>
        <ReactPlaceholder
          ready={this.state.loaded}
          customPlaceholder={<NotePanelPlaceholder />}>
          {this.state.loaded && (
            <Card className="p-3 p-sx-0">
              <Typography
                component="h1"
                className="title"
                variant="h4"
                color="textPrimary"
                gutterBottom>
                Profil użytkownika {user.userName}{' '}
              </Typography>
              <img
                src={user.pictureUrl || 'http://placekitten.com/50/50'}
                alt="UserPicture"
              />
            </Card>
          )}
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
                {notes.map((x, i) => (
                  <Grid item sm={3} key={i} className="grid-item">
                    <Link to={`/note/${x.id}`}>
                      <Paper className="paper p-md-3 p-1" elevation={3}>
                        {x.noteCount <= 0 && <div className="disabled" />}
                        <div>{x.title}</div>
                      </Paper>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Card>
          )}
        </ReactPlaceholder>
      </div>
    );
  }
}
