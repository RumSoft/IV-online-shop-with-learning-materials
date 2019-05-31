import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Button, CircularProgress } from '@material-ui/core';
import './index.scss';
import NoPreviewImage from '../../images/alt128.png';
import { APIService } from '../../Services';
import Axios from 'axios';

export default class DownloadNoteCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false,
      data: null
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
      async () => {
        const blob = await Axios.get(
          `${APIService.API_URL}/api/notes/download-request/${note.id}`,
          {
            responseType: 'blob',
            headers: {
              Authorization: `Bearer ${localStorage['auth_token']}`
            }
          }
        );
        console.log(note);
        const url = window.URL.createObjectURL(blob.data);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${note.name}.${note.extension}`);
        document.body.appendChild(link);
        link.click();
        this.setState({
          link: link,
          downloading: false
        });
      }
    );
  }

  render() {
    const { note } = this.props;
    const { downloading, link } = this.state;

    return (
      <Paper className="download-note-card note-card p-2 m-1">
        {downloading && (
          <div className="busy-overlay">
            <div className="text-center m-auto">
              <CircularProgress /> <p>pobieranie</p>
            </div>
          </div>
        )}
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
              {link ? (
                <Button //already downloaded, state.link contains object
                  ref={r => (this.button = r)}
                  id="download"
                  className="btn btn-info"
                  onClick={() => link.click()}>
                  Pobierz
                </Button>
              ) : (
                <Button //not downloaded yet
                  ref={r => (this.button = r)}
                  id="download"
                  className="btn btn-info"
                  onClick={() => this.handleDownload(note)}>
                  Pobierz
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
