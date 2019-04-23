import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

export default class MyTextField extends Component {
  validateField(validationRules, value) {
    if (!validationRules) return true;

    return validationRules
      .map((rule, i) => (rule.func(value) ? null : rule.message))
      .filter(x => x);
  }

  render() {
    let props = this.props;
    props = { ...props, className: null };

    let messages = this.validateField(
      this.props.validationRules,
      this.props.value
    );

    if (messages && messages.length) props = { ...props, error: true };

    return (
      <div className={this.props.className}>
        <TextField className="input-field" {...props} fullWidth />
        <p className="input-field-error p-0 m-0">
          <small>{(messages && messages.length && messages[0]) || ''}</small>
        </p>
      </div>
    );
  }
}
