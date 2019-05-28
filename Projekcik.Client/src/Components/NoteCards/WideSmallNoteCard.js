import React from 'react';
import { Link } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { ShowNoteButton } from '../Buttons';
import './index.scss';

export default class WideSmallNoteCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <Paper className="wide-small-note-card note-card p-2 m-1">
        <div className="note">
          <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
            <h6>{note.title}</h6>
          </Link>
          <p>{note.description}</p>
        </div>
        <div className="btn-small-group">
          <ShowNoteButton id={note.id} />
        </div>
      </Paper>
    );
  }
}
