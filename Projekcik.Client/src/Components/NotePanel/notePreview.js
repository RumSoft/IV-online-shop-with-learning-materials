import React, { Component } from 'react';
import NoPreviewImage from '../../images/alt900.png';

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
    if (!note || !note.previewUrl)
      return (
        <div className="preview-image no-preview">
          <img src={NoPreviewImage} alt="brak podglądu" />
        </div>
      );

    return (
      <div>
        <div className="preview-image">
          <img src={this.getPreviewImage()} alt={note.name} />
        </div>
        <div className="text-center">
          <p>
            Strona {this.state.page + 1} z {note.pageCount}
          </p>
          <div className=" btn-group">
            <button
              className="btn btn-dark md-3 p-2"
              onClick={() => this.changePage(-1)}>
              Poprzednia
            </button>
            <button
              className="btn btn-info md-3 p-2"
              onClick={() => this.changePage(1)}>
              Następna
            </button>
          </div>
        </div>
      </div>
    );
  }
}
