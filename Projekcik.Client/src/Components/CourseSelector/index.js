import React, { Component } from 'react';
import classNames from 'classnames';
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
import APIService from '../../Services/APIService';

export default class CourseSelector extends Component {
  state = {
    activeStep: 0,
    voivodeships: [],
    universities: [],
    courses: [],
    voivodeship: null,
    university: null,
    course: null,

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

  render() {
    const transitionDelay = 100; // w ms;
    const transitionDuration = 300; //w ms
    const { activeStep } = this.state;

    APIService.getVoivodeships().then(data =>
      this.setState({ voivodeships: data })
    );

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
        {/* <Grid container spacing={8}>
          <Grid item xs={4} sm={3} md={2} xl={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleFacebookLogin}
              className="undo-button">
              <Icon className="fas fa-undo-alt " />
              {'  '}Cofnij
            </Button>
          </Grid>
          <Grid xs={8} sm={9} md={10} xl={11}> */}
        <TextField
          id="filterText"
          className="field mb-3"
          label="Wyszukaj"
          variant="outlined"
          fullWidth
          value={this.state.filterText}
          onChange={this.handleChange}
        />
        {/* </Grid>
        </Grid> */}
        {activeStep === 0 && (
          <div>
            <Grid container spacing={8}>
              {this.filterList(this.state.voivodeships)
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
                        this.setState(
                          {
                            activeStep: 1,
                            voivodeship: x,
                            filterText: ''
                          },
                          () =>
                            APIService.getUniversities(
                              this.state.voivodeship.id
                            ).then(r => {
                              this.setState({ universities: r });
                            })
                        );
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
              {this.filterList(this.state.universities)
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
                        this.setState(
                          {
                            activeStep: 2,
                            university: x,
                            filterText: ''
                          },
                          () =>
                            APIService.getCourses(
                              this.state.university.id
                            ).then(r => {
                              this.setState({ courses: r });
                            })
                        );
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
              {this.filterList(this.state.courses)
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
                        this.setState(
                          {
                            activeStep: 3,
                            course: x,
                            filterText: ''
                          },
                          () => {
                            const passedData = {
                              voivodeship: this.state.voivodeship,
                              university: this.state.university,
                              course: this.state.course
                            };
                            this.props.searchData(passedData);
                          }
                        );
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
