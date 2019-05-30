import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { ShowNoteButton } from '../Buttons';
import './index.scss';
import NoPreviewImage from '../../images/alt128.png';

export default class WideSmallNoteCard extends React.Component {
  truncate(text, length) {
    if (text.length > length) return `${text.substr(0, length - 1)}…`;
    return text;
  }

  render() {
    const { note } = this.props;

    return (
      <Paper className="wide-small-note-card note-card p-2 m-1">
        <Grid container>
          <Grid item lg={4} md={5} style={{ display: 'flex' }}>
            <img
              src={note.previewUrl || NoPreviewImage}
              className="note-preview my-auto"
              alt="notePreview"
            />
          </Grid>
          <Grid item lg={8} md={7}>
            <div className="note">
              <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
                <h5>{note.name}</h5>
              </Link>
              <p>{this.truncate(note.description, 50)}</p>
            </div>
            <div className="btn-group">
              <ShowNoteButton id={note.id} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
