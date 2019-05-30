import React, { Component } from 'react';
import UserPanel from '../../Components/UserPanel';

export class UserPage extends Component {
  render() {
    return (
      <UserPanel
        query={this.props.location.search}
        history={this.props.history}
      />
    );
  }
}

export default UserPanel;
