import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CourseSelector from '../CourseSelector';
import NoteTable from '../SearchTable';

import './index.scss';

export default class HomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: {
        voivodeshipId: null,
        universityId: null,
        courseId: null
      }
    };

    this.courseSelectorHandler = this.courseSelectorHandler.bind(this);
  }

  courseSelectorHandler(data) {
    this.setState({ selection: data });
  }

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

          <Card className="course-selector-card mb-3">
            <CourseSelector searchData={this.courseSelectorHandler} />
            <hr />
            <div>szybkie okienko pierwszych wników</div>
            {/* use those values to search for notes */}
            <p>
              {[
                this.state.selection.voivodeshipId,
                this.state.selection.universityId,
                this.state.selection.courseId
              ]
                .filter(x => x)
                .join(', ')}
            </p>
            <a href="#link"> pokaż więcej </a>
          </Card>
          <NoteTable />
          <footer className="footer">
            <h6 className="footer-item">Stopka</h6>
            <p className="footer-item">
              Skontaktuj się z nami (zwykły tag p > Typography)
            </p>
          </footer>
          {/* End Stopka */}
        </React.Fragment>
      </div>
    );
  }
}
