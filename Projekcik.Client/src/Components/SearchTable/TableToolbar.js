import React, { Component } from 'react';
import { Typography, IconButton, Tooltip, Toolbar } from '@material-ui/core';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import FilterListIcon from '@material-ui/icons/FilterList';

export default class EnhancedTableToolbar extends Component {
  state = {
    clicked: false,
    search: '',
    sortBy: 'name',
    sortOrder: 'asc'
  };

  handleChange = () => {
    this.setState({ clicked: !this.state.clicked }, () => this.notifyParent());
  };

  handleSort = event => {
    this.setState({ [event.target.id]: event.target.value }, () =>
      this.notifyParent()
    );
  };

  notifyParent() {
    this.props.filterData({
      clicked: this.state.clicked,
      sortBy: this.state.sortBy,
      sortOrder: this.state.sortOrder
    });
  }

  render() {
    return (
      <Toolbar className="toolbar-root">
        <div>
          <Typography variant="h6" id="tableTitle" className="toolbar-title">
            Wyniki wyszukiwania
          </Typography>
        </div>
        <div className="toolbar-sort">
          <Form inline className="toolbar-form">
            <FormGroup>
              <Label for="sortBy" className="toolbar-input pb-2 pr-2 pt-2">
                Sortuj według
              </Label>
              <Input
                type="select"
                className="toolbar-input mr-2"
                name="selectby"
                id="sortBy"
                onChange={this.handleSort}>
                <option value="name">nazwy</option>
                <option value="created">daty</option>
                <option value="price">ceny</option>
                <option value="voivodeship">województwa</option>
                <option value="university">uczelni</option>
                <option value="course">kierunku</option>
                <option value="semester">semestru</option>
                <option value="author">autora</option>
              </Input>
              <Input
                type="select"
                name="selectorder"
                id="sortOrder"
                className="toolbar-input"
                onChange={this.handleSort}>
                <option value="asc">rosnąco</option>
                <option value="desc">malejąco</option>
              </Input>
            </FormGroup>
          </Form>
        </div>
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
