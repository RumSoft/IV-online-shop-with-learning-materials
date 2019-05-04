import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import NoteService from '../../Services/NoteService';
import './index.scss';

export default class NoteLayout extends Component {
  constructor(props) {
    super(props);
    NoteService.getNote().then(r => {
      this.setState({
        data: { ...this.state.data, name: r }
      });
    });

    this.state = {
      selection: {
        name: '',
        price: '',
        description: '',
        noteId: this.props.id
      },
      data: {
        name: [],
        price: [],
        description: [],
        noteId: this.props.id
      }
    };
  }
  handleNote= noteId =>{
    this.setState(
      {
        name: '',
        price: '',
        description: '',
        noteId: this.props.id
      },
      () =>
        NoteService.getNote(this.props.id).then(data => this.setState({ selection: data }))
    );
  }
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
            Nazwa notatki: {this.state.name}
            <br />
            Krótki opis: {this.state.description}
            <br />
            Cena notatki: {this.state.price}
            <br />
            Unikalne ID notatki V1: {this.state.noteId}
            <br/>
            <Button
              type="submit"
              className="button submit"
              variant="contained"
              color="primary"
              onClick={this.handleNote}>
              Przycisk
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
