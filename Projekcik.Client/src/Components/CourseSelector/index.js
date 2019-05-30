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
    let reset = { course: null };
    if (step <= 1) reset = { university: null, ...reset };
    if (step <= 0) reset = { voivodeship: null, ...reset };

    this.setState(
      {
        activeStep: step,
        filterText: '',
        selection: { ...this.state.selection, ...reset }
      },
      () => this.notifyParent()
    );
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

  ileNotatek(count) {
    if (count === 0) return 'brak notatek';
    if (count % 10 === 1) return '1 notatka';
    if (count % 10 >= 2 && count % 10 <= 4) return `${count} notatki`;
    return `${count} notatek`;
  }

  render() {
    const { activeStep, selection, data } = this.state;

    return (
      <div className="course-selector">
        <Stepper activeStep={activeStep} className="course-selector-stepper">
          <Step>
            <StepLabel
              className="step-label step-label-1 enabled"
              onClick={() => this.handleBackTo(0)}
              optional={
                <Typography variant="caption" className="step-label-caption">
                  {selection.voivodeship ? selection.voivodeship.name : '-'}
                </Typography>
              }>
              <Typography className="step-label-title">Województwo</Typography>
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
              className={classNames('step-label step-label-2', {
                enabled: activeStep >= 1
              })}
              onClick={() => this.handleBackTo(1)}
              optional={
                <Typography variant="caption" className="step-label-caption">
                  {selection.university ? selection.university.name : '-'}
                </Typography>
              }>
              <Typography className="step-label-title">Uczelnia</Typography>
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
                <Typography variant="caption" className="step-label-caption">
                  {selection.course ? selection.course.name : '-'}
                </Typography>
              }>
              <Typography className="step-label-title">Kierunek</Typography>
            </StepLabel>
          </Step>
        </Stepper>
        {activeStep < 3 && (
          <TextField
            id="filterText"
            className="field mb-3"
            label="Wyszukaj"
            variant="outlined"
            fullWidth
            value={this.state.filterText}
            onChange={this.handleChange}
          />
        )}

        {activeStep === 0 && (
          <Grid
            className="grid"
            container
            spacing={8}
            direction="row"
            justify="center"
            alignItems="stretch">
            {this.filterList(data.voivodeships)
              .sort((a, b) => a.noteCount < b.noteCount)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={i}
                  className="grid-item"
                  onClick={() => x.noteCount > 0 && this.handleForward(x)}>
                  <Paper className="paper p-md-2 p-1" elevation={4}>
                    {x.noteCount <= 0 && <div className="disabled" />}
                    {x.noteCount > 0 && <div className="hover" />}
                    <div>{x.name}</div>
                    <small>{this.ileNotatek(x.noteCount)}</small>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid className="grid" container spacing={8}>
            {this.filterList(data.universities)
              .sort((a, b) => a.noteCount < b.noteCount)
              .filter((x, i) => i < 8)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={i}
                  className="grid-item"
                  onClick={() => x.noteCount > 0 && this.handleForward(x)}>
                  <Paper className="paper p-md-2 p-1" elevation={3}>
                    {x.noteCount <= 0 && <div className="disabled" />}
                    {x.noteCount > 0 && <div className="hover" />}
                    <div className="uni">{x.name}</div>
                    <small>{this.ileNotatek(x.noteCount)}</small>
                    <img className="uniImage" src={x.imageUrl} alt="" />
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid className="grid" container spacing={8}>
            {this.filterList(data.courses)
              .sort((a, b) => a.noteCount < b.noteCount)
              .filter((x, i) => i < 8)
              .map((x, i) => (
                <Grid
                  item
                  xs={3}
                  key={i}
                  className="grid-item"
                  onClick={() => x.noteCount > 0 && this.handleForward(x)}>
                  <Paper className="paper p-md-3 p-1" elevation={3}>
                    {x.noteCount <= 0 && <div className="disabled" />}
                    {x.noteCount > 0 && <div className="hover" />}
                    <div>{x.name}</div>
                    <small>{this.ileNotatek(x.noteCount)}</small>
                  </Paper>
                </Grid>
              ))}
          </Grid>
        )}
      </div>
    );
  }
}
