import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import NoteService from '../../Services/NoteService';
import './index.scss';

export default class NoteLayout extends Component {
  handleDialogOpen = () => {
    this.setState(() => NoteService.getAllNotes().then(r => console.log(r)));
  };
  render() {
    return (
      <div className="home-layout">
        <Card className="main mb-3 mx-auto">
          <Typography
            component="h1"
            className="title mx-auto"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom>
            Witaj na stronie notatki
          </Typography>
          <Typography
            className="subtitle mx-auto"
            align="center"
            color="textSecondary"
            paragraph>
            RumSoft.ru jest właścicielem wszelkich praw strony LeniwyStudent.pl
            <hr />
            <Button
              className="button"
              variant="outlined"
              color="primary"
              onClick={this.handleDialogOpen}>
              Info o notatce
            </Button>
            <hr />
            Autor notatki: {this.props.title}
            <br />
            Krótki opis: {this.props.content}
            <br />
            Unikalne ID notatki: {this.props.id}
            <hr />
            <Button
              type="submit"
              className="button submit"
              variant="contained"
              color="primary"
              onClick={this.handle}>
              Kup teraz
            </Button>
          </Typography>
        </Card>

        <Card className="main mb-3 mx-auto">
          <Typography
            component="h1"
            className="title mx-auto"
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom>
            Tutaj bedzie podglad notatki, a wnioski zrobia kury nioski
          </Typography>
        </Card>
      </div>
    );
  }
}
