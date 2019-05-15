import React, { Component } from 'react';
import UserService from '../../Services/UserService';
import NoteService from '../../Services/NoteService';
import { 
  Card,
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography} from '@material-ui/core';
import ReactPlaceholder from 'react-placeholder';
import NotePanelPlaceholder from '../NotePanel/NotePanelPlaceholder';

export default class UserPanel2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: [],
      filtered: [],
      loaded: false
    };

    NoteService.getUserNotes(this.props.id).then(r => {
      this.setState({ note: r, loaded: true });
    });

    UserService.getUser(this.props.id).then(data => {
      this.setState({ user: data, loaded: true });
    });

    //UserService.getUser(this.props.id).then(r => console.log(r));
    //NoteService.getUserNotes(this.props.id).then(r => console.log(r));

  }
  filterList = updatedList => {
    return (updatedList = updatedList.filter(
      item =>
        item.name
          .search(this.state.filterText.toLowerCase()) !== -1
    ));
  };
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
              <img src={user.pictureUrl} alt="UserPicture" />
            </Typography>
          )}
          <Card className="main">
            <Typography
              className="mx-auto"
              align="center"
              color="textSecondary"
              paragraph>
              <br />
              lorem ipsum twoja staralorem ipsum twoja staralorem ipsum twoja
              staralorem ipsum twoja staralorem ipsum twoja staralorem ipsum
              twoja staralorem ipsum twoja staralorem ipsum twoja staralorem
              ipsum twoja staralorem ipsum twoja staralorem ipsum twoja staraa
              <hr />
              Przeglądaj swoje notatki:
              <br />
              <Grid
            className="grid"
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="stretch">
            {this.filterList(note)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={i}
                  className="grid-item"
                  onClick={() => x.wpuscByZaruchac}>
                  <Paper className="paper p-md-3 p-1" elevation={3}>
                    {x.noteCount <= 0 && <div className="disabled" />}
                    <div>{x.name}</div>
                  </Paper>
                </Grid>
              ))}
        </Grid>
            </Typography>
          </Card>
        </ReactPlaceholder>
      </div>
    );
  }
}
