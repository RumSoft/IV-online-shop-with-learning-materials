import React, { Component } from 'react';
import UserPanel2 from '../../Components/UserPanel2';

export default class UserPage2 extends Component {
  render() {
    return (
      <div className="UserPage">
        <UserPanel2 id={this.props.match.params.id} />
      </div>
    );
  }
}
