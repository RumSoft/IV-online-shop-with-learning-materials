import React, { Component } from 'react';
import { Typography, IconButton, Tooltip, Toolbar } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';

export default class EnhancedTableToolbar extends Component {
  state = {
    clicked: false
  };

  handleChange = () => {
    this.setState({ clicked: !this.state.clicked }, () => this.notifyParent());
  };

  notifyParent() {
    this.props.filterData({ clicked: this.state.clicked });
  }

  render() {
    return (
      <Toolbar className="toolbar-root">
        <div className="toolbar-title">
          <Typography variant="h6" id="tableTitle">
            Znalezione notatki
          </Typography>
        </div>
        <div className="toolbar-spacer" />
        <div className="toolbar-actions">
          <Tooltip title="Parametry wyszukiwania">
            <IconButton
              aria-label="Parametry wyszukiwania"
              onClick={this.handleChange}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Toolbar>
    );
  }
}
