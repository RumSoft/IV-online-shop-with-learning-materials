import React, { Component } from 'react';
import { TextField } from '@material-ui/core';

export default class MyTextField extends Component {
  validateField(validationRules, value) {
    if (!validationRules) return true;

    return validationRules
      .map((rule, i) => (rule.func(value) ? null : rule.message))
      .filter(x => x);
  }

  isValid() {
    let messages = this.validateField(
      this.props.validationRules,
      this.props.value
    );

    return !(messages && messages.length);
  }

  render() {
    let props = this.props;
    props = {
      ...props,
      className: null,
      validationRules: null,
      showError: null
    };
    Object.keys(props).forEach(key => props[key] == null && delete props[key]);

    let messages = this.validateField(
      this.props.validationRules,
      this.props.value
    );

    if (this.props.showError && messages && messages.length)
      props = { ...props, error: true };

    return (
      <div className={`${this.props.className || ''} mb-3`}>
        <TextField
          className="input-field"
          {...props}
          fullWidth
          error={props.error}
        />
        <p className="input-field-error p-0 m-0">
          <small>
            {(this.props.showError &&
              messages &&
              messages.length &&
              messages[0]) ||
              ''}
          </small>
        </p>
      </div>
    );
  }
}
