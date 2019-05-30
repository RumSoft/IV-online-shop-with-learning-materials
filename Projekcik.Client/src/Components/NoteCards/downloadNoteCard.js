import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Button } from '@material-ui/core';
import { ShowNoteButton } from '../Buttons';
import './index.scss';
import NoPreviewImage from '../../images/alt128.png';
import { NoteService } from '../../Services';

export default class DownloadNoteCard extends React.Component {
  truncate(text, length) {
    if (text.length > length) return `${text.substr(0, length - 1)}…`;
    return text;
  }

  handleDownload(noteId) {
    NoteService.downloadRequest(noteId).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.getElementById('download').appendChild(link);
      link.click();
    });
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
              <Button
                id="download"
                className="btn btn-info"
                onClick={() => this.handleDownload(note.id)}>
                Pobierz
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
