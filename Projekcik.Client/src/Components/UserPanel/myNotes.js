import React from 'react';
import { Grid } from '@material-ui/core';
import { DownloadNoteCard } from '../NoteCards';

const MyNotes = props => (
  <div>
    <h2 className="p-3">
      <i className="fa fa-book-reader" /> Moje notatki
    </h2>
    <Grid
      className="grid"
      container
      spacing={8}
      direction="row"
      justify="flex-start">
      {props.notes.map((note, i) => (
        <Grid item sm={4} key={i} className="grid-item-note">
          {note.noteCount <= 0 && <div className="disabled" />}
          <DownloadNoteCard note={note} key={i} />
        </Grid>
      ))}
    </Grid>
  </div>
);

export default MyNotes;
