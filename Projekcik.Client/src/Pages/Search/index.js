import React, { Component } from 'react';
import NoteTable from '../../Components/SearchTable';

export class SearchPage extends Component {
  render() {
    return <NoteTable query={this.props.location.search} />;
  }
}

export default SearchPage;
