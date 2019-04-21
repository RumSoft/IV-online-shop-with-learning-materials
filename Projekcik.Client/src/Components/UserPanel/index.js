import React, { Component } from 'react';
import APIService from '../../Services/APIService';

export class UserPanel extends Component {
  state = {
    data: {}
  };

  componentDidMount() {
    APIService.get('api/Auth/me').then(data => {
      this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.state.data, null, 2)}</pre>
        {this.state.data && this.state.data.pictureUrl && (
          <img src={this.state.data.pictureUrl} alt={this.state.username} />
        )}
      </div>
    );
  }
}

export default UserPanel;
