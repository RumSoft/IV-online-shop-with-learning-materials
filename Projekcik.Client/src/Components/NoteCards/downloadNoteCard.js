import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Button, CircularProgress } from '@material-ui/core';
import NoPreviewImage from '../../images/alt128.png';
import { APIService } from '../../Services';
import Axios from 'axios';
import './index.scss';

export default class DownloadNoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
      data: null,
      error: null
    };
  }

  truncate(text, length) {
    if (text.length > length) return `${text.substr(0, length - 1)}…`;
    return text;
  }

  async handleDownload(note) {
    this.setState(
      {
        downloading: true,
        data: null
      },
      () => {
        Axios.get(
          `${APIService.API_URL}/api/notes/download-request/${note.id}`,
          {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage['auth_token']}`
            }
          }
        )
          .then(blob => {
            console.log(note);
            const url = window.URL.createObjectURL(blob.data);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${note.name}.${note.fileExtension}`);
            document.body.appendChild(link);
            link.click();
            this.setState({
              link: link,
              downloading: false,
              error: null
            });
          })
          .catch(r => {
            this.setState({
              link: null,
              downloading: false,
              error: true
            });
          });
      }
    );
  }

  render() {
    const { note } = this.props;
    const { downloading, link, error } = this.state;

    return (
      <Paper className="download-note-card note-card p-2 m-1">
        {downloading && (
          <div className="busy-overlay">
            <div className="text-center m-auto">
              <CircularProgress />
              <p>Pobieranie</p>
            </div>
          </div>
        )}
        {error && (
          <div
            className="busy-overlay"
            onClick={() => this.setState({ error: null })}>
            <div className="text-center m-auto">
              <p>Błąd pobierania</p>
              <p>
                <small>kliknij aby zamknąć</small>
              </p>
            </div>
          </div>
        )}
        <Grid container>
          <Grid item lg={4} md={5} style={{ display: 'flex', width: '100%' }}>
            <img
              src={note.previewUrl || NoPreviewImage}
              className="note-preview m-auto"
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
              <Button //not downloaded yet
                ref={r => (this.button = r)}
                id="download"
                className="download btn"
                onClick={() =>
                  link ? link.click() : this.handleDownload(note)
                }>
                Pobierz
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
