import React, { Component } from 'react';
import UserService from '../../Services/UserService';
import NoteService from '../../Services/NoteService';
import { Typography, Card } from '@material-ui/core';
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
              Witaj, {user.userName}
              <p4>
                {' '}
                <img src={user.pictureUrl} alt="UserPicture" />
              </p4>
            </Typography>
          )}
          <Card className="main">
            <Typography
              className="mx-auto"
              align="center"
              color="textSecondary"
              paragraph>
              <br/>
              lorem ipsum twoja staralorem ipsum twoja staralorem ipsum twoja
              staralorem ipsum twoja staralorem ipsum twoja staralorem ipsum
              twoja staralorem ipsum twoja staralorem ipsum twoja staralorem
              ipsum twoja staralorem ipsum twoja staralorem ipsum twoja staraa
              <hr />
              Przeglądaj swoje notatki
              <br/><br/><br/><br/><br/><br/><br/>


            </Typography>
          </Card>
        </ReactPlaceholder>
      </div>
    );
  }
}
