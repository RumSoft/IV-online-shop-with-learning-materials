import React, { Component } from 'react';
import {
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography
} from '@material-ui/core';

import './index.scss';
import UniService from '../../Services/NoteService';

export default class CourseSelector extends Component {
  constructor(props) {
    super(props);
    UniService.getAllNotes().then(r => {
      this.setState({ data: this.state.data, voivodeships: r });
    });
  }

  state = {
    data: {
      voivodeships: []
    },
    activeStep: 0,
    filterText: ''
  };

  filterList = updatedList => {
    return (updatedList = updatedList(
      item =>
        item.name
          .toLocaleLowerCase()
          .search(this.state.filterText.toLocaleLowerCase()) !== -1
    ));
  };

  render() {
    const data = this.state;
    return (
      <div className="course-selector">
        <Stepper className="course-selector-stepper">
          <Step>
            <StepLabel className="step-label enabled">
              <Typography className="step-label-title">Notatka</Typography>
            </StepLabel>
          </Step>
        </Stepper>

        <Grid
          container
          spacing={8}
          direction="row"
          justify="center"
          alignItems="stretch">
          {data.voivodeships
            .filter(x => true)
            .filter((x, i) => i < 8)
            .map((x, i) => (
              <Grid item xs={3} key={x.id} className="grid-item">
                <Paper className="paper p-md-2 p-1" elevation={4}>
                  <span>{x.name}</span>
                </Paper>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
