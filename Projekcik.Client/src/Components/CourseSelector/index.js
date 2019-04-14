import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles } from './styles';
import {
  Grid,
  TextField,
  Zoom,
  Grow,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography
} from '@material-ui/core';

import './index.scss';

class CourseSelector extends Component {
  state = {
    activeStep: 0,

    voivodeship: null,
    university: null,
    course: null,

    filterText: ''
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
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

  render() {
    const transitionDelay = 100; // w ms;
    const transitionDuration = 300; //w ms
    const { activeStep } = this.state;

    //mock data
    const voivodeships = [
      { id: 1, name: 'podkarpackie' },
      { id: 2, name: 'zachodnio-pomorskie' },
      { id: 3, name: 'swietokrzyskie' },
      { id: 4, name: 'witam pozdrawiam' },
      { id: 5, name: 'polska' },
      { id: 6, name: 'ameryka' },
      { id: 7, name: 'kujawsko-pomorskie' },
      { id: 8, name: 'malopolskie' },
      { id: 9, name: 'podkarpackie9' },
      { id: 10, name: 'podkarpackie11' },
      { id: 11, name: 'podkarpackie12' },
      { id: 12, name: 'podkarpackie13' },
      { id: 13, name: 'podkarpackie14' },
      { id: 14, name: 'podkarpackie15' },
      { id: 15, name: 'podkarpackie16' },
      { id: 16, name: 'podkarpackie10' }
    ];

    const universities = [
      { id: 1, name: 'politechnika' },
      { id: 1, name: 'politechnika2' },
      { id: 2, name: 'politechnika3' },
      { id: 3, name: 'politechnika4' },
      { id: 4, name: 'politechnika5' },
      { id: 5, name: 'politechnika6' },
      { id: 6, name: 'politechnika7' },
      { id: 7, name: 'politechnika8' },
      { id: 8, name: 'politechnika9' },
      { id: 9, name: 'politechnika9' },
      { id: 10, name: 'politechnika10' },
      { id: 11, name: 'politechnika11' }
    ];

    const courses = [
      { id: 1, name: 'informatyka' },
      { id: 1, name: 'zarządzanie' },
      { id: 2, name: 'budowa maszyn' },
      { id: 3, name: 'chemia' },
      { id: 4, name: 'biotechnologia' },
      { id: 5, name: 'matematyka' },
      { id: 6, name: 'agrokultura' },
      { id: 7, name: 'rysowanie w paincie' },
      { id: 8, name: 'harmonogramologia' },
      { id: 9, name: 'witam pozdrawiam' },
      { id: 10, name: 'i tak nie zdasz' },
      { id: 11, name: 'programowanie w javie (fuj)' }
    ];

    return (
      <div className="course-selector">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel
              className="step-label step-label-1 enabled"
              onClick={() => {
                this.setState({
                  activeStep: 0,
                  university: null,
                  voivodeship: null,
                  course: null,
                  filterText: ''
                });
              }}
              optional={
                <Typography variant="caption">
                  {this.state.voivodeship ? this.state.voivodeship.name : '-'}
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
              onClick={() => {
                if (activeStep >= 1)
                  this.setState({
                    activeStep: 1,
                    university: null,
                    course: null,
                    filterText: ''
                  });
              }}
              optional={
                <Typography variant="caption">
                  {this.state.university ? this.state.university.name : '-'}
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
                if (activeStep >= 2)
                  this.setState({
                    activeStep: 2,
                    course: null,
                    filterText: ''
                  });
              }}
              optional={
                <Typography variant="caption">
                  {this.state.course ? this.state.course.name : '-'}
                </Typography>
              }>
              Kierunek
            </StepLabel>
          </Step>
        </Stepper>
        <TextField
          id="filterText"
          className="field mb-3"
          label="Wyszukaj"
          variant="outlined"
          fullWidth
          value={this.state.filterText}
          onChange={this.handleChange}
        />
        {activeStep === 0 && (
          <div>
            <Grid container spacing={8}>
              {this.filterList(voivodeships)
                .filter((x, i) => i < 8)
                .map((x, i) => (
                  <Zoom
                    in={activeStep === 0}
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${(transitionDelay * i) / 1000}s`
                    }}>
                    <Grid
                      item
                      xs={3}
                      key={x.id}
                      className="grid-item"
                      onClick={() => {
                        this.setState({
                          activeStep: 1,
                          voivodeship: x,
                          filterText: ''
                        });
                      }}>
                      <Paper className="paper p-md-3" elevation={4}>
                        {x.name}
                      </Paper>
                    </Grid>
                  </Zoom>
                ))}
            </Grid>
          </div>
        )}
        {activeStep === 1 && (
          <div>
            <Grid container spacing={8}>
              {this.filterList(universities)
                .filter(x => true)
                .filter((x, i) => i < 8)
                .map((x, i) => (
                  <Zoom
                    in={activeStep === 1}
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${(transitionDelay * i) / 1000}s`
                    }}>
                    <Grid
                      item
                      xs={3}
                      key={x.id}
                      className="grid-item"
                      onClick={() => {
                        this.setState({
                          activeStep: 2,
                          university: x,
                          filterText: ''
                        });
                      }}>
                      <Paper className="paper p-md-3" elevation={3}>
                        {x.name}
                      </Paper>
                    </Grid>
                  </Zoom>
                ))}
            </Grid>
          </div>
        )}
        {activeStep === 2 && (
          <div>
            <Grid container spacing={8}>
              {this.filterList(courses)
                .filter(x => true)
                .filter((x, i) => i < 8)
                .map((x, i) => (
                  <Grow
                    in={activeStep === 2}
                    timeout={transitionDuration}
                    style={{
                      transitionDelay: `${(transitionDelay * i) / 1000}s`
                    }}>
                    <Grid
                      item
                      xs={3}
                      key={x.id}
                      className="grid-item"
                      onClick={() => {
                        this.setState({
                          activeStep: 3,
                          course: x,
                          filterText: ''
                        });
                      }}>
                      <Paper className="paper p-md-3" elevation={3}>
                        {x.name}
                      </Paper>
                    </Grid>
                  </Grow>
                ))}
            </Grid>
          </div>
        )}
      </div>
    );
  }
}

CourseSelector.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CourseSelector);
