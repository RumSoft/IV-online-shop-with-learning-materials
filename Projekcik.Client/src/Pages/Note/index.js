import React, { Component } from 'react';
import NotePanel from '../../Components/NotePanel';

export default class NotePage extends Component {
  render() {
    return (
      <div className="notepage">
        <NotePanel id={this.props.match.params.id} />
      </div>
    );
  }
}
