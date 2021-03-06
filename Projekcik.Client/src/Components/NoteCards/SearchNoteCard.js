import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Typography, Paper } from '@material-ui/core';
import './index.scss';
import { ShowNoteButton, AddToCartButton } from '../Buttons';
import NoPreviewImage from '../../images/alt128.png';

export default class SearchNoteCard extends Component {
  render() {
    const { note } = this.props;

    return (
      <Grid item sm={12} md={6}>
        <Paper className="search-note-card note-card p-2 m-2">
          <div className="note-image">
            <img
              src={note.previewUrl || NoPreviewImage}
              className="note-preview my-auto mr-2"
              alt="notePreview"
            />
            <div className="note-main">
              <Link to={`/note/${note.id}`} style={{ textDecoration: 'none' }}>
                <h5 className="note-title">{note.name}</h5>
                <h6 className="note-price">{note.price} zł</h6>
              </Link>

              <span>
                <Typography>
                  {' '}
                  <i className="fa fa-globe" />
                  {note.voivodeship.name}
                </Typography>

                <Typography>
                  {' '}
                  <i className="fa fa-university" />
                  {note.university.name}
                </Typography>

                <Typography>
                  <i className="fa fa-book" />
                  {note.course.name}, sem. {note.semester}
                </Typography>
              </span>
            </div>
          </div>
          <div className="btn-group">
            <ShowNoteButton text="Zobacz notatkę" id={note.id} />
            <AddToCartButton id={note.id} owned={note.owned} />
          </div>
        </Paper>
      </Grid>
    );
  }
}
