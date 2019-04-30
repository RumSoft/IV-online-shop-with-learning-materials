import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import './index.scss';

export default class NoteLayout extends Component {
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
            <br />
            Autor notatki: {this.props.title}
            <br />
            Krótki opis: {this.props.content}
            <br />
            Unikalne ID notatki: {this.props.ID}
            <br />
            <Button
              type="submit"
              className="button login-submit"
              variant="contained"
              color="primary"
              onClick={this.handleLogin}>
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
