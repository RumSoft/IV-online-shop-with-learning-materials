import React, { Component } from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class CheckboxA extends Component {
  state = {
    checkedA: false
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.checkedA}
          color="primary"
          style={{ display: 'flex' }}
          onChange={this.handleChange('checkedA')}
          value="checkedA"
        />
      </div>
    );
  }
}

export default CheckboxA;
