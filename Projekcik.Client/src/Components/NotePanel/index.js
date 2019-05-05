import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { Card, LinearProgress } from '@material-ui/core';
import HrLabel from '../HrLabel/index';
import NoteService from '../../Services/NoteService';
import './index.scss';

export default class NotePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false
    };
    NoteService.getNote(this.props.id).then(r =>
      this.setState({ ...r, loaded: true })
    );
  }
  render() {
    return (
      <div>
        {this.state.loaded ? (
          <div className="note-panel">
            <Card className="main mb-3 mx-auto">
              <HrLabel text="witam" />
              <Typography
                className="subtitle mx-auto"
                align="center"
                color="textSecondary"
                paragraph>
                Autor: {this.state.author.name}
                <br />
                Nazwa notatki: {this.state.name}
                <br />
                Krótki opis: {this.state.description}
                <br />
                Cena notatki: {this.state.price}
                <br />
                Unikalne ID notatki: {this.state.id}
                <br />
              </Typography>
            </Card>
            <Card className="main mb-3 mx-auto">
              <HrLabel text="pozdrawiam" />
            </Card>
          </div>
        ) : (
          <LinearProgress />
        )}
      </div>
    );
  }
}
