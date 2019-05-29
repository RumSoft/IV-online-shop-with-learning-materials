import React, { Component } from 'react';
import NoteUploader from '../../Components/NoteUploader';

export class UploadPage extends Component {
  render() {
    return (
      <div className="upload-page">
        <NoteUploader />
      </div>
    );
  }
}

export default UploadPage;
