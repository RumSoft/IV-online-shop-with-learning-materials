import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, Button } from '@material-ui/core';
import NoteService from '../../Services/NoteService';
import CourseSelector from '../NoteSelector';
import './index.scss';

export default class NoteLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: {
        voivodeshipId: null,
      }
    };

    this.courseSelectorHandler = this.courseSelectorHandler.bind(this);
  }

  courseSelectorHandler(data) {
    this.setState({ selection: data });
  }

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
            <Card className="course-selector-card mb-3">
            <CourseSelector searchData={this.courseSelectorHandler} />
            <hr />
            <div>Wynik:</div>
            {/* use those values to search for notes */}
            <p>
              {[
                this.state.selection.voivodeshipId,
              ]
                .filter(x => x)
                .join(', ')}
            </p>
          </Card>
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
