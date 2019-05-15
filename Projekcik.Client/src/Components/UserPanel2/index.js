import React, { Component } from 'react';
import UserService from '../../Services/UserService';
import NoteService from '../../Services/NoteService';
import { Typography } from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import NotePanelPlaceholder from '../NotePanel/NotePanelPlaceholder';

export default class UserPanel2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    UserService.getUser(this.props.id).then(data => {
      this.setState({ user: data, loaded: true });
    });

    NoteService.getUserNotes(this.props.id).then(r => {
      this.setState({ note: r, loaded: true });
    });
    console.log('dupa');
    UserService.getUser(this.props.id).then(r => console.log(r));
  }

  render() {
    const note = this.state.note;
    const user = this.state.user;
    return (
      <div>
        <ReactPlaceholder
          ready={this.state.loaded}
          customPlaceholder={<NotePanelPlaceholder />}>
          {this.state.loaded && (
            <Typography
              component="h1"
              className="title mx-auto"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              {user.userName}
            </Typography>
          )}
        </ReactPlaceholder>
      </div>
    );
  }
}
