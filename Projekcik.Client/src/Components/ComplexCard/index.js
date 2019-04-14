import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Checkbox from '../Checkbox';
import Grid from '@material-ui/core/Grid';
import { styles } from './styles';

class ComplexCard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid container>
        <Grid item>
          <Card className={classes.card}>
            <CardHeader
              title="Politechnika Rzeszowska"
              subheader="im. Ignacego Łukasiewicza w Rzeszowie"
            />
            <CardMedia
              className={classes.media}
              image="https://w.prz.edu.pl/fcp/8GBUKOQtTKlQhbx08SlkTVgRLUWRuHQwFDBoIVURNWHlSFVZpCFghUHcKVigEQUw/509/flawonoidy/images/prz_pozytyw_300.jpg"
              title="Politechnika Rzeszowska"
            />

            <Checkbox />
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ComplexCard);
