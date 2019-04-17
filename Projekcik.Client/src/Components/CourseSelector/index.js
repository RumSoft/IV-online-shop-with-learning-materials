import React, { Component } from 'react';
import classNames from 'classnames';
import {
  Grid,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography
} from '@material-ui/core';

import './index.scss';
import UniService from '../../Services/UniService';

export default class CourseSelector extends Component {
  constructor(props) {
    super(props);
    UniService.getVoivodeships().then(r => {
      this.setState({ data: { ...this.state.data, voivodeships: r } });
    });
  }

  state = {
    selection: {
      voivodeship: null,
      university: null,
      course: null
    },
    data: {
      voivodeships: [],
      universities: [],
      courses: []
    },
    activeStep: 0,
    filterText: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  filterList = updatedList => {
    return (updatedList = updatedList.filter(
      item =>
        item.name
          .toLocaleLowerCase()
          .search(this.state.filterText.toLocaleLowerCase()) !== -1
    ));
  };

  notifyParent() {
    this.props.searchData({
      voivodeshipId: this.state.selection.voivodeship
        ? this.state.selection.voivodeship.id
        : null,
      universityId: this.state.selection.university
        ? this.state.selection.university.id
        : null,
      courseId: this.state.selection.course
        ? this.state.selection.course.id
        : null
    });
  }

  handleBackTo(step) {
    if (step > this.state.activeStep) return;

    let reset = { course: null, activeStep: step, filterText: '' };
    if (step <= 1) reset = { university: null, ...reset };
    if (step <= 0) reset = { voivodeship: null, ...reset };

    this.setState({
      activeStep: step,
      selection: { ...this.state.selection, ...reset }
    });
    this.notifyParent();
  }

  handleForward(item) {
    if (this.state.activeStep === 0) {
      UniService.getUniversities(item.id).then(r => {
        this.setState(
          {
            activeStep: 1,
            filterText: '',
            selection: { ...this.state.selection, voivodeship: item },
            data: { ...this.state.data, universities: r }
          },
          () => this.notifyParent()
        );
      });
    } else if (this.state.activeStep === 1) {
      UniService.getCourses(item.id).then(r => {
        this.setState(
          {
            activeStep: 2,
            filterText: '',
            selection: { ...this.state.selection, university: item },
            data: { ...this.state.data, courses: r }
          },
          () => this.notifyParent()
        );
      });
    } else if (this.state.activeStep === 2) {
      this.setState(
        {
          activeStep: 3,
          filterText: '',
          selection: {
            ...this.state.selection,
            course: item
          }
        },
        () => this.notifyParent()
      );
    }
  }

  render() {
    const { activeStep, selection, data } = this.state;
    return (
      <div className="course-selector">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel
              className="step-label step-label-1 enabled"
              onClick={() => this.handleBackTo(0)}
              optional={
                <Typography variant="caption">
                  {selection.voivodeship ? selection.voivodeship.name : '-'}
                </Typography>
              }>
              Województwo
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className={classNames('step-label step-label-2', {
                enabled: activeStep >= 1
              })}
              onClick={() => this.handleBackTo(1)}
              optional={
                <Typography variant="caption">
                  {selection.university ? selection.university.name : '-'}
                </Typography>
              }>
              Uczelnia
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className={classNames('step-label step-label-3', {
                enabled: activeStep >= 2
              })}
              onClick={() => {
                this.handleBackTo(2);
              }}
              optional={
                <Typography variant="caption">
                  {selection.course ? selection.course.name : '-'}
                </Typography>
              }>
              Kierunek
            </StepLabel>
          </Step>
        </Stepper>
        {activeStep < 3 && (
          <div>
            <TextField
              id="filterText"
              className="field mb-3"
              label="Wyszukaj"
              variant="outlined"
              fullWidth
              value={this.state.filterText}
              onChange={this.handleChange}
            />
            <p>wyników</p>
          </div>
        )}

        {activeStep === 0 && (
          <Grid container spacing={8}>
            {this.filterList(data.voivodeships)
              .filter((x, i) => i < 8)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={x.id}
                  className="grid-item"
                  onClick={() => this.handleForward(x)}>
                  <Paper className="paper p-md-3" elevation={4}>
                    {x.name}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={8}>
            {this.filterList(data.universities)
              .filter(x => true)
              .filter((x, i) => i < 8)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={x.id}
                  className="grid-item"
                  onClick={() => this.handleForward(x)}>
                  <Paper className="paper p-md-3" elevation={3}>
                    {x.name}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid container spacing={8}>
            {this.filterList(data.courses)
              .filter(x => true)
              .filter((x, i) => i < 8)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={x.id}
                  className="grid-item"
                  onClick={() => this.handleForward(x)}>
                  <Paper className="paper p-md-3" elevation={3}>
                    {x.name}
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
      </div>
    );
  }
}
