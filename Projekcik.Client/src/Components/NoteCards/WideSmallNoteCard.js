import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid } from '@material-ui/core';
import { ShowNoteButton } from '../Buttons';
import './index.scss';
import NoPreviewImage from '../../images/alt128.png';

export default class WideSmallNoteCard extends React.Component {
  render() {
    const { note } = this.props;

    return (
      <Paper className="wide-small-note-card note-card p-2 m-1">
        <Grid container style={{ height: '100%' }}>
          <Grid item lg={4} md={5} style={{ display: 'flex' }}>
            <img
              src={note.previewUrl || NoPreviewImage}
              className="note-preview my-auto"
              alt="notePreview"
            />
          </Grid>
          <Grid className="note-main" lg={8} md={7}>
            <div className="note">
              <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
                <h5 className="note-title">{note.name}</h5>
              </Link>
              <span className="note-desc">{note.description}</span>
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
