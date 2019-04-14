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

function getSteps() {
  return ['Wybierz Uczelnię', 'Wybierz Wydział', 'Wybierz Kierunek'];
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

class VerticalStepper extends Component {
  state = {
    activeStep: 0
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

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
              <StepContent>
                <Typography>{getStepContent(index)}</Typography>
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={this.handleBack}
                      className={classes.button}>
                      Wstecz
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}>
                      {activeStep === steps.length - 1 ? 'Szukaj' : 'Dalej'}
                    </Button>
                  </div>
                </div>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>Wyszukiwanie notatek...</Typography>
            <CircularProgress color="primary" />
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalStepper.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(VerticalStepper);
