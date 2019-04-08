import React, { Component } from 'react';
import './index.scss';
export default class HrLabel extends Component {
  render() {
    return <hr class="hr-text" data-content={this.props.text} />;
  }
}
