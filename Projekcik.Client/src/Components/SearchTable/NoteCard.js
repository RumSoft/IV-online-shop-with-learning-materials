import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography } from '@material-ui/core';
import './index.scss';
import { ShowNoteButton, AddToCartButton } from '../Buttons';

export default class NoteCard extends Component {
  render() {
    const { note } = this.props;

    return (
      <Grid item sm={6}>
        <Card className="note-card p-2 m-2">
          <div className="note-image">
            <img
              className="p-2 m-2"
              style={{
                width: 128,
                height: 128
              }}
              src="http://placekitten.com/g/400/400"
              alt="notePreview"
            />
            <div className="note-other">
              <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
                <h5>{note.name}</h5>
                <h6>{note.price} zł</h6>
              </Link>

              <dl>
                <Typography>Województwo: {note.voivodeship.name}</Typography>
                <Typography />
                <Typography>Uczelnia: {note.university.name}</Typography>
                <Typography />
                <Typography>
                  Kierunek: {note.course.name}, sem. {note.semester}
                </Typography>
                <Typography />
              </dl>
            </div>
          </div>
          <div className="btn-group">
            <ShowNoteButton text="Zobacz notatkę" id={note.id} />
            <AddToCartButton id={note.id} />
          </div>
        </Card>
      </Grid>
    );
  }
}
