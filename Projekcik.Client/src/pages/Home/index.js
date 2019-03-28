import React, { Component } from 'react';
import './index.scss';
import img from './concept.JPG';

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <h2>HomePage</h2>
        <img src={img} className="concent" />
      </div>
    );
  }
}
