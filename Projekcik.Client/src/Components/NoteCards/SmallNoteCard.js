import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Paper } from '@material-ui/core';
import { ShowNoteButton, AddToCartButton } from '../Buttons';
import './index.scss';

export default class SmallNoteCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <Paper className="small-note-card note-card p-2 m-2">
        <div className="note-name">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <h5>{note.name}</h5>
          </Link>
        </div>
        <div className="note-small-info">
          <span>
            <Typography>
              <i className="fa fa-globe" />
              {note.voivodeship.name}
            </Typography>
            <Typography>
              <i className="fa fa-university" />
              {note.university.name}
            </Typography>
            <Typography>
              <i className="fa fa-book" />
              {note.course.name}, sem. {note.semester}
            </Typography>
          </span>
        </div>
        <div className="btn-small-group">
          <ShowNoteButton id={note.id} />
          <AddToCartButton price={note.price} id={note.id} owned={note.owned} />
        </div>
      </Paper>
    );
  }
}
