import React, { Component } from 'react';
import { Typography, IconButton, Tooltip, Toolbar } from '@material-ui/core';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import FilterListIcon from '@material-ui/icons/FilterList';

export default class EnhancedTableToolbar extends Component {
  state = {
    clicked: false,
    search: '',
    sortBy: '',
    sortOrder: ''
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
        <div className="toolbar-title pr-5 mr-5">
          <Typography variant="h6" id="tableTitle">
            Wyniki wyszukiwania
          </Typography>
        </div>
        <Form inline>
          <FormGroup>
            <Label for="sortBy" className="pr-2 pt-1">
              Sortuj przez
            </Label>
            <Input
              type="select"
              className="mr-2"
              name="selectby"
              id="sortBy"
              onChange={this.handleSort}>
              <option value="name">nazwę</option>
              <option value="price">cenę</option>
              <option value="voivodeship">województwo</option>
              <option value="university">uczelnię</option>
              <option value="course">kierunek</option>
              <option value="semester">semestr</option>
              <option value="author">autora</option>
            </Input>
            <Input
              type="select"
              name="selectorder"
              id="sortOrder"
              onChange={this.handleSort}>
              <option value="asc">rosnąco</option>
              <option value="desc">malejąco</option>
            </Input>
          </FormGroup>
        </Form>
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
