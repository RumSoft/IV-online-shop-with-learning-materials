import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Card, Typography } from '@material-ui/core';
import './index.scss';

const NoteCard = ({ note }) => (
  <Grid item sm={6}>
    <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
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
          <h5>{note.name}</h5>
          <h6>{note.price} zł</h6>
          <dl>
            <Typography>Województwo: {note.voivodeship.name}</Typography>
            <Typography />
            <Typography>Uczelnia: {note.university.name}</Typography>{' '}
            <Typography />
            <Typography>Kierunek: {note.course.name}</Typography> <Typography />
          </dl>
        </div>
        <div className="origin" />
      </Card>
    </Link>
  </Grid>
);

export default NoteCard;
