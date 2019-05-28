import React, { Component } from 'react';

export default class NotePreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      pageCount: props.note.pageCount
    };
  }

  getPreviewImage() {
    if (this.state.page === 0) return this.props.note.previewUrl;
    return `${this.props.note.previewUrl}-${this.state.page}`;
  }

  changePage(change) {
    const { page, pageCount } = this.state;
    this.setState({
      page: (page + pageCount + change) % pageCount
    });
  }

  render() {
    const { note } = this.props;
    if (!note || !note.previewUrl) return <p>brak podglądu</p>;

    return (
      <div>
        <p>
          strona {this.state.page + 1} z {note.pageCount}
        </p>
        <button onClick={() => this.changePage(1)}>Next</button>
        <button onClick={() => this.changePage(-1)}>prev</button>
        <div className="preview-image">
          <img src={this.getPreviewImage()} alt={note.name} />
        </div>
      </div>
    );
  }
}
