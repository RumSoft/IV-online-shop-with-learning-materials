import React, { Component } from 'react';
import NoteService from '../../Services/NoteService';
import {
  Grid,
  Card,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel,
  CircularProgress,
  Fade
} from '@material-ui/core';
import './index.scss';
import ListCourseSelector from '../ListCourseSelector';
import MyTextField from '../MyTextField';

export default class NoteUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      description: '',
      file: null,
      semester: 0,
      courseId: null,

      voivodeship: '',
      university: '',
      course: '',

      error: '',
      success: '',
      sending: false
    };

    this.listCourseSelectorHandler = this.listCourseSelectorHandler.bind(this);
  }
  forms = {};

  listCourseSelectorHandler(data) {
    this.setState({
      voivodeship: data.voivodeship,
      university: data.university,
      course: data.course,
      courseId: data.courseId
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleChangePrice = event => {
    let value = event.target.value.replace(',', '.');
    value = value.replace(/[^0-9^.]/, '');
    this.setState({
      [event.target.id]: `${value}`
    });
  };

  fileHandler = event => {
    this.setState({ file: event.target.files[0] });
  };

  errorHandler = () => {
    let forms = Object.keys(this.forms).map(key => this.forms[key]);
    let isValid = forms.every(x => x.isValid());
    if (!isValid) {
      this.setState({
        errorMessage: 'Wypełnij poprawnie wszystkie pola',
        loading: false
      });
      return true;
    }

    const strings = [
      this.state.name,
      this.state.price,
      this.state.description,
      this.state.voivodeship,
      this.state.university,
      this.state.course
    ];



    if (this.state.file === null) {
      this.setState({ error: 'Dodaj plik notatki!' });
      window.scrollTo(0, 0);
      return true;
    }

    for (var string of strings) {
      if (
        string === '' ||
        this.state.courseId === null ||
        this.state.semester === 0
      ) {
        this.setState({ error: 'Wypełnij wszystkie pola!' });
        window.scrollTo(0, 0);
        return true;
      }
    }
    return false;
  };

  handleSubmit = event => {
    let note = new FormData();
    note.append('file', this.state.file);
    note.append('name', this.state.name);
    note.append('price', this.state.price);
    note.append('description', this.state.description);
    note.append('semester', this.state.semester);
    note.append('course', this.state.courseId);

    let errors = this.errorHandler();
    if (!errors) {
      this.setState({
        name: '',
        price: '',
        description: '',
        file: null,
        semester: 0,
        courseId: null,
        voivodeship: '',
        university: '',
        course: '',
        sending: true
      });
      NoteService.sendNote(note)
        .then(r => {
          this.setState({
            success: 'Dodano notatkę! Możesz ją wyświetlić ',
            noteId: r.id,
            sending: false
          });
          window.scrollTo(0, 0);
        })
        .catch(e =>
          this.setState(
            { error: e.response.data.message, sending: false },
            () => this.errorHandler()
          )
        );
    }
  };

  render() {
    return (
      <Card className="upload-page-card mb-2">
        {this.state.success && (
          <div className="eval success">
            {this.state.success}{' '}
            <a
              href={`/note/${this.state.noteId}`}
              style={{ color: 'lightblue' }}>
              tutaj!
            </a>
          </div>
        )}

        {this.state.sending ? (
          <div className="sending-overlay">
            <div className="progress-text">
              <CircularProgress />
              <h1 className="h3">Wysyłanie notatki</h1>
              <Fade in={true} timeout={500} style={{ transitionDelay: '3s' }}>
                <h1 className="h5">Generowanie podglądu</h1>
              </Fade>
              <Fade in={true} timeout={500} style={{ transitionDelay: '5s' }}>
                <h1 className="h5">Koloryzacja guzików</h1>
              </Fade>
              <Fade in={true} timeout={500} style={{ transitionDelay: '7s' }}>
                <h1 className="h5">Sprawdzanie siecią neuronową</h1>
              </Fade>
              <Fade in={true} timeout={500} style={{ transitionDelay: '9s' }}>
                <h1 className="h5">Akceptacja przez moderatora z Mumbaju</h1>
              </Fade>
              <Fade in={true} timeout={500} style={{ transitionDelay: '11s' }}>
                <h1 className="h5">
                  Wyprowadzanie równania sprzedanej notatki
                </h1>
              </Fade>
            </div>
          </div>
        ) : (
          ''
        )}
        {this.state.error && (
          <div className="eval errors">{this.state.error}</div>
        )}
        <div className="note-upload-header">
          <h3>Dodaj nową notatkę</h3>
          <hr />
        </div>
        <form className="note-form" onSubmit={this.handleSubmit}>
          <Grid container spacing={16}>
            <Grid item md={6}>
              <MyTextField
                id="name"
                className="field"
                showError={this.state.errorMessage}
                label="Nazwa notatki"
                ref={r => {
                  this.forms.name = r;
                }}
                inputProps={{ maxLength: 70 }}
                variant="outlined"
                value={this.state.name}
                onChange={this.handleChange}
                validationRules={[
                  {
                    func: val => val,
                    message: 'Nazwa notatki jest wymagana'
                  },
                  {
                    func: val =>
                      /^((?!kuu*rw|jee*bb*|huu*jj*|duu*p|pp*ii*ee*rr*d|cii*p|pii*zz*d).)*$/.test(
                        val
                      ),
                    message: 'Nie bluźnij !'
                  }
                ]}
              />
              <MyTextField
                id="price"
                className="field"
                showError={this.state.errorMessage}
                label="Cena"
                ref={r => {
                  this.forms.price = r;
                }}
                variant="outlined"
                value={this.state.price}
                onChange={this.handleChangePrice}
                validationRules={[
                  {
                    func: val => val,
                    message: 'Cena jest wymagana'
                  },
                  {
                    func: val => val >= 0.1,
                    message: 'Minimalna cena to 10 groszy'
                  },
                  {
                    func: val => val < 100,
                    message: 'Notatka musi kosztować mniej niż 100zł'
                  },
                  {
                    func: val => /^(\d*\.?\d{1,2})$/.test(val),
                    message: 'Nieprawidłowy format'
                  }
                ]}
              />
              <MyTextField
                id="description"
                label="Opis notatki"
                showError={this.state.errorMessage}
                ref={r => {
                  this.forms.description = r;
                }}
                multiline
                rows="3"
                helperText="Max. 500 znaków..."
                inputProps={{ maxLength: 500 }}
                className="field description"
                variant="outlined"
                value={this.state.description}
                onChange={this.handleChange}
                validationRules={[
                  {
                    func: val => val,
                    message: 'Dodaj opis notatki'
                  }
                ]}
              />
            </Grid>
            <Grid item md={6}>
              <MyTextField
                id="voivodeship"
                className="field selector voivodeship"
                label="Województwo"
                showError={this.state.errorMessage}
                variant="outlined"
                disabled
                ref={r => {
                  this.forms.voivodeship = r;
                }}
                value={this.state.voivodeship}
              />
              <MyTextField
                id="university"
                className="field selector university"
                label="Uczelnia"
                variant="outlined"
                disabled
                showError={this.state.errorMessage}
                ref={r => {
                  this.forms.university = r;
                }}
                value={this.state.university}
              />
              <MyTextField
                id="course"
                className="field selector course"
                label="Kierunek"
                showError={this.state.errorMessage}
                disabled
                variant="outlined"
                value={this.state.course}
                ref={r => {
                  this.forms.course = r;
                }}
                validationRules={[
                  {
                    func: val => val,
                    message: 'Wybierz kierunek uczelni'
                  }
                ]}
              />

              <ListCourseSelector searchData={this.listCourseSelectorHandler} />
            </Grid>

            <Grid item md={6}>
              <FormControl variant="outlined" className="semester-list">
                <InputLabel ref="Semester" htmlFor="outlined-age-native-simple">
                  Semestr
                </InputLabel>
                <Select
                  native
                  id="semester"
                  fullWidth
                  value={this.state.semester}
                  onChange={this.handleChange}
                  input={
                    <OutlinedInput
                      name="semester"
                      labelWidth={58}
                      id="outlined-age-native-simple"
                    />
                  }>
                  <option value="" />
                  <option value={1}>Pierwszy</option>
                  <option value={2}>Drugi</option>
                  <option value={3}>Trzeci</option>
                  <option value={4}>Czwarty</option>
                  <option value={5}>Piąty</option>
                  <option value={6}>Szósty</option>
                  <option value={7}>Siódmy</option>
                </Select>
              </FormControl>
              <div>
                <p>Preferowane typy plików: .pdf .docx .jpg .zip</p>
                <input type="file" id="file" onChange={this.fileHandler} />
              </div>
            </Grid>
          </Grid>
          <Button
            //type="submit"
            className="file-submit button mt-3"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}>
            Dodaj notatkę
          </Button>
        </form>
      </Card>
    );
  }
}
