import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import CourseSelector from '../CourseSelector';
import { Link } from 'react-router-dom';
import './index.scss';
import NoteService from '../../Services/NoteService';
import SmallCard from './SmallCard';
import Slider from 'react-slick';
import AddCard from './AddCard';

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
              Witaj w sklepie z notatkami leniwystudent.pl !
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
                  <SmallCard note={note} key={i} />
                ))}
                <AddCard />
              </Slider>
            )}
            <Link to={`/search`}>pokaz wiecej</Link>
          </Card>
          <footer className="footer border-bottom box-shadow mb-3" dark>
            <h4 className="footer-item">
              Powered by <i className="fab fa-react fa-spin" />React , created
              by <i className="fa fa-procedures" />
              RumSoft Sp. zoo.{' '}
            </h4>
          </footer>
        </React.Fragment>
      </div>
    );
  }
}
