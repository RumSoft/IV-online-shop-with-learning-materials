import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  }
});

class RadioButtonsGroup extends React.Component {
  state = {
    value: 'weii'
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup
            aria-label="Faculty"
            name="faculty1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}>
            <FormControlLabel
              value="weii"
              control={<Radio color="primary" />}
              label="Elektrotechniki i Informatyki"
            />
            <FormControlLabel
              value="wbmis"
              control={<Radio color="primary" />}
              label="Budowy Maszyn i Lotnictwa"
            />
            <FormControlLabel
              value="chem"
              control={<Radio color="primary" />}
              label="Chemiczny"
            />
            <FormControlLabel
              value="giz"
              control={<Radio />}
              label="Gier i Zabaw"
            />
          </RadioGroup>
        </FormControl>
      </div>
    );
  }
}

RadioButtonsGroup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RadioButtonsGroup);
