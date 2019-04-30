import React, { Component } from 'react';
import NoteLayout from '../../Components/NoteLayout';

export default class NotePage extends Component {
  render() {
    return (
      <div className="notepage">
      NoteID: {this.props.match.params.id}
        <NoteLayout />
      </div>
    );
  }
}
