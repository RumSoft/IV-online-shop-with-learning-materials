import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import './index.scss';

export default class ShowNoteButton extends Component {
  state = {
    redirect: null
  };

  redirectToNote(id) {
    this.setState({
      redirect: `/note/${id}`
    });
  }

  render() {
    const { text, id } = this.props;
    if (this.state.redirect) return <Redirect to={this.state.redirect} />;
    return (
      <Button
        className="btn note btn-md px-0"
        onClick={() => this.redirectToNote(id)}>
        <i className="fa fa-book-open " />{' '}
        {text ? <span> {text} </span> : <span> Zobacz</span>}{' '}
      </Button>
    );
  }
}
