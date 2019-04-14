import React from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import VerticalStepper from '../VerticalStepper';

function HomeLayout(props) {
  const { classes } = props;

  return (
    <React.Fragment>
      <CssBaseline />

      <main>
        {/* Naglowek */}
        <Card className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography
              component="h1"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              Witaj w sklepie "Witam Pozdrawiam"!
            </Typography>
            <Typography align="center" color="textSecondary" paragraph>
              Wyszukaj najlepsze notatki studenckie dla Ciebie według poniższych
              kryteriów lub użyj wyszukiwarki. Zachęcamy również do założenia
              własnego konta, aby móc sprzedawać własne notatki. Zajmię Ci to
              dosłownie 3.14159265359 sekund!
            </Typography>
          </div>
        </Card>
        {/* End Naglowek */}
      </main>

      {/* Srodek */}
      <Card>
        <VerticalStepper />
      </Card>
      {/* End Srodek */}

      {/* Stopka */}
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
