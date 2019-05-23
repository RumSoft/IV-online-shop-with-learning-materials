import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@material-ui/core';
import './index.scss';

export default class AddCard extends React.Component {
  render() {
    return (
      <Card className="note-card p-2 m-2">
        <Link to="/upload">
          <div className="note-image">Dodaj notatkę</div>
        </Link>
      </Card>
    );
  }
}
