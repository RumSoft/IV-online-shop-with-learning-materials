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
      <h3>
        {Object.values(this.state.data).map((element, idx) => {
          return <div key={idx}>{element}</div>;
        })}
      </h3>
    );
  }
}

export default UserPanel;
