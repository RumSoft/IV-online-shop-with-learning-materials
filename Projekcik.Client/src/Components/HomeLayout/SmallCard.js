import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import { ShowNoteButton, AddToCartButton } from '../Buttons';
import './index.scss';

export default class SmallCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <Card className="note-card p-2 m-2">
        <div className="note-name">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <h5>{note.name}</h5>
          </Link>
        </div>
        <div className="note-small-info">
          <dl>
            <Typography>
              <i className="fa fa-globe" />
              {note.voivodeship.name}
            </Typography>
            <Typography />
            <Typography>
              <i className="fa fa-university" />
              {note.university.name}
            </Typography>
            <Typography />
            <Typography>
              <i className="fa fa-book" />
              {note.course.name}, sem. {note.semester}
            </Typography>
            <Typography />
          </dl>
        </div>
        <div className="btn-small-group">
          <ShowNoteButton id={note.id} />
          <AddToCartButton
            className="btn cart btn-md rounded-left rounded-right"
            price={note.price}
            id={note.id}
          />
        </div>
      </Card>
    );
  }
}
