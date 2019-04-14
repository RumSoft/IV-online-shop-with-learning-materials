import React from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import CourseSelector from '../CourseSelector';

import './index.scss';

function HomeLayout(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Card className="main mb-3 px-md-5 p-sm-2 px-xs-3">
        <Typography
          component="h1"
          className="title mx-auto"
          variant="h4"
          align="center"
          color="textPrimary"
          gutterBottom>
          Witaj w sklepie "Witam Pozdrawiam"!
        </Typography>
        <Typography
          className="subtitle mx-auto"
          align="center"
          color="textSecondary"
          paragraph>
          Wyszukaj najlepsze notatki studenckie dla Ciebie według poniższych
          kryteriów lub użyj wyszukiwarki. Zachęcamy również do założenia
          własnego konta, aby móc sprzedawać własne notatki. Zajmię Ci to
          dosłownie 3.14159265359 sekund!
        </Typography>
      </Card>

      <Card className="course-selector-card my-3 px-md-3 p-sm-2">
        <CourseSelector />
      </Card>

      <footer className={classes.footer}>
        <h6 className={classes.footerItem}>Stopka</h6>
        <p className={classes.footerItem}>
          Skontaktuj się z nami (kurłaaaaaa zwykły tag p > Typography)
        </p>
      </footer>
      {/* End Stopka */}
    </React.Fragment>
  );
}

export default withStyles(styles)(HomeLayout);
