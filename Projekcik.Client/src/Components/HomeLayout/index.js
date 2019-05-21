import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CourseSelector from '../CourseSelector';

import './index.scss';
import NoteService from '../../Services/NoteService';
import SmallCard from './SmallCard';

export default class HomeLayout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selection: {
        voivodeshipId: null,
        universityId: null,
        courseId: null
      },
      notes: null
    };

    this.courseSelectorHandler = this.courseSelectorHandler.bind(this);
    this.loadNotes();
  }

  loadNotes() {
    NoteService.search(this.state.selection).then(x => {
      this.setState({ notes: x.notes }, () => {});
    });
  }

  courseSelectorHandler(data) {
    this.setState({ selection: data }, () => this.loadNotes());
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
            <a href="https://projekcik-prz.azurewebsites.net/search">
              pokaż więcej
            </a>
            {this.state.notes &&
              this.state.notes.length &&
              // <Carousel>
              this.state.notes.map((note, i) => (
                <SmallCard note={note} key={i} />
              ))
            // </Carousel>
            }
            <a href="https://projekcik-prz.azurewebsites.net/search">
              pokaż więcej
            </a>
          </Card>
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
