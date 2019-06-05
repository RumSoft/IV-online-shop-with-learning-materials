import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CourseSelector from '../CourseSelector';
import './index.scss';
import NoteService from '../../Services/NoteService';
import Slider from 'react-slick';
import { SmallNoteCard } from '../NoteCards';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

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
    NoteService.search({
      ...this.state.selection,
      sortBy: 'created',
      sortOrder: 'DESC'
    }).then(x => {
      this.setState({ notes: x.notes }, () => {
        this.slider.forceUpdate();
        let elements = [...document.getElementsByClassName('small-note-card')];
        let height = Math.max.apply(Math, elements.map(x => x.offsetHeight));
        console.log(height);
        elements.forEach(x => (x.style.height = `${height}px`));
      });
    });
  }

  courseSelectorHandler(data) {
    this.setState({ selection: data }, () => this.loadNotes());
  }

  render() {
    const sliderSettings = {
      autoplay: true,
      rows: 1,
      infinite: this.state.notes && this.state.notes.length >= 4,
      slidesToShow: 4,
      swipeToSlide: true,
      adaptiveHeight: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 3
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

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
              Witaj w sklepie z notatkami !
            </Typography>
            <Typography
              className="subtitle mx-auto"
              align="center"
              color="textSecondary"
              paragraph>
              Wyszukaj najlepsze notatki studenckie dla Ciebie według poniższych
              kryteriów lub użyj wyszukiwarki. Zachęcamy również do założenia
              własnego konta, aby móc sprzedawać własne notatki lub kupować je
              od innych. Zajmie Ci to dosłownie 3.14159265359 sekund!
            </Typography>
          </Card>

          <Card className="course-selector-card mb-3">
            <CourseSelector searchData={this.courseSelectorHandler} />
            <hr />
            <h4>
              <i className="fa fa-yin-yang fa-spin " />
              Ostatnie notatki
            </h4>
            {this.state.notes && this.state.notes.length && (
              <Slider
                ref={ref => {
                  this.slider = ref;
                }}
                {...sliderSettings}>
                {this.state.notes.map((note, i) => (
                  <SmallNoteCard note={note} key={i} />
                ))}
              </Slider>
            )}

            <Link
              to={{
                pathname: '/search',
                search: queryString.stringify(this.state.selection)
              }}>
              pokaż więcej
            </Link>
          </Card>
          <footer className="footer border-bottom box-shadow mb-3">
            <h4 className="footer-item">
              Strona powstała dzięki <i className="fa fa-procedures" />
              RumSoft Sp. zoo.
            </h4>
          </footer>
        </React.Fragment>
      </div>
    );
  }
}
