import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';

import './index.scss';

export default class NoteLayout extends Component {
  render() {
    return (
      <div className="home-layout">
        <React.Fragment>
          <CssBaseline />
          <Card className="main mb-3 mx-auto">
            <Typography
              component="h1"
              className="title mx-auto"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              Witaj na stronie notatki
            </Typography>
            <Typography
              className="subtitle mx-auto"
              align="center"
              color="textSecondary"
              paragraph>
              RumSoft jest właścicielem wszelkich praw strony LeniwyStudent.pl
              Opis notatki jest w trakcie robienia.
            </Typography>
          </Card>

          <Card className="main mb-3 mx-auto">
            <Typography
              component="h1"
              className="title mx-auto"
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom>
              Tutaj bedzie notatka, a wnioski zrobia kury nioski
            </Typography>
          </Card>

          <footer className="footer">
            <h6 className="footer-item">Stopka</h6>
            <p className="footer-item">Kontakt: RumSoft.ru</p>
          </footer>
          {/* End Stopka */}
        </React.Fragment>
      </div>
    );
  }
}
