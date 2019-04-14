import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { styles } from './styles';
import ComplexCard from '../ComplexCard';
import RadioList from '../RadioList';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Grid, TextField } from '@material-ui/core';

import './index.scss';

function getSteps() {
  return ['Wybierz województwo', 'Wybierz uczelnię', 'Wybierz kierunek'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <div style={{ display: 'flex' }}>
          <ComplexCard />
        </div>
      );
    case 1:
      return <RadioList />;
    case 2:
      return `Coming soon...`;
    default:
      return 'Unknown step';
  }
}

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
    const steps = getSteps();
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
      { id: 1, name: 'matematyka dyskretna' },
      { id: 1, name: 'programowanie w c++' },
      { id: 2, name: 'algorytmy i str. danych' },
      { id: 3, name: 'systemy operacjny' },
      { id: 4, name: 'mikronapędy' },
      { id: 5, name: 'bazy danych' },
      { id: 6, name: 'inzynieria oprogramowania' },
      { id: 7, name: 'sztuczna yntelygencya' },
      { id: 8, name: 'fizyka' },
      { id: 9, name: 'etyka' },
      { id: 10, name: 'sygaly i systemy' },
      { id: 11, name: 'programowanie w javie (fuj)' }
    ];

    return (
      <div className="course-selector">
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel
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
                  {this.state.voivodeship
                    ? voivodeships[this.state.voivodeship].name
                    : '-'}
                </Typography>
              }>
              Województwo
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
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
                  {this.state.university
                    ? universities[this.state.university].name
                    : '-'}
                </Typography>
              }>
              Uczelnia
            </StepLabel>
          </Step>
          <Step>
            <StepLabel
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
                  {this.state.course ? courses[this.state.course].name : '-'}
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
                .filter(x => true)
                .filter((x, i) => i < 8)
                .map(x => (
                  <Grid
                    item
                    xs={3}
                    key={x.id}
                    className="grid-item"
                    onClick={() => {
                      this.setState({
                        activeStep: 1,
                        voivodeship: x.id
                      });
                    }}>
                    <Paper className="paper p-md-3" square elevation={3}>
                      {x.name}
                    </Paper>
                  </Grid>
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
                .map(x => (
                  <Grid
                    item
                    xs={3}
                    key={x.id}
                    className="grid-item"
                    onClick={() => {
                      this.setState({
                        activeStep: 2,
                        university: x.id
                      });
                    }}>
                    <Paper className="paper p-md-3" square elevation={3}>
                      {x.name}
                    </Paper>
                  </Grid>
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
                .map(x => (
                  <Grid
                    item
                    xs={3}
                    key={x.id}
                    className="grid-item"
                    onClick={() => {
                      this.setState({
                        activeStep: 3,
                        course: x.id
                      });
                    }}>
                    <Paper className="paper p-md-3" square elevation={3}>
                      {x.name}
                    </Paper>
                  </Grid>
                ))}
            </Grid>
          </div>
        )}

        {activeStep === 3 && <p>wybrano</p>}
      </div>
    );

    // <div className={classes.root}>
    //   <Stepper activeStep={activeStep} orientation="horizontal">
    //     {steps.map((label, index) => (
    //       <Step key={label}>
    //         <StepLabel>{label}</StepLabel>
    //         <StepContent>
    //           <Typography>{getStepContent(index)}</Typography>
    //           <div className={classes.actionsContainer}>
    //             <div>
    //               <Button
    //                 disabled={activeStep === 0}
    //                 onClick={this.handleBack}
    //                 className={classes.button}>
    //                 Wstecz
    //               </Button>
    //               <Button
    //                 variant="contained"
    //                 color="primary"
    //                 onClick={this.handleNext}
    //                 className={classes.button}>
    //                 {activeStep === steps.length - 1 ? 'Szukaj' : 'Dalej'}
    //               </Button>
    //             </div>
    //           </div>
    //         </StepContent>
    //       </Step>
    //     ))}
    //   </Stepper>
    //   {activeStep === steps.length && (
    //     <Paper square elevation={0} className={classes.resetContainer}>
    //       <Typography>Wyszukiwanie notatek...</Typography>
    //       <CircularProgress color="primary" />
    //       <Button onClick={this.handleReset} className={classes.button}>
    //         Reset
    //       </Button>
    //     </Paper>
    //   )}
    // </div>
    // );
  }
}

CourseSelector.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(CourseSelector);
