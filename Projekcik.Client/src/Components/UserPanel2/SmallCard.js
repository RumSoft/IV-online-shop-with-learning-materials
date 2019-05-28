import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import { ShowNoteButton  } from '../Buttons';
import './index.scss';

export default class SmallCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <Card className="note-card p-2 m-1">
        <div className="note">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <h5>{note.name}</h5>
          </Link>
          <p>{note.description}</p>
        </div>
        <div className="btn-group">
          <ShowNoteButton id={note.id} />
        </div>
      </Card>
    );
  }
}
