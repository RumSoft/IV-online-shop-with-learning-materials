import React, { Component } from 'react';
import NoteTable from '../../Components/SearchTable';
import SimpleTable from '../../Components/SearchTable/SimpleTable';

export class SearchPage extends Component {
  render() {
    return (
      <div>
        <NoteTable />
      </div>
    );
  }
}

export default SearchPage;
