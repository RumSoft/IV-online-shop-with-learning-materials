import React, { Component } from 'react';
import './index.scss';
import HomeLayout from '../../Components/HomeLayout';

export default class HomePage extends Component {
  render() {
    return (
      <div className="homepage">
        <HomeLayout />
      </div>
    );
  }
}
