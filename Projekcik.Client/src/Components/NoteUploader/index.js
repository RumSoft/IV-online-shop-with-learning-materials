import React, { Component } from 'react';
import NoteService from '../../Services/NoteService';
import {
  Card,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel,
  CircularProgress
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
    const strings = [
      this.state.name,
      this.state.price,
      this.state.description,
      this.state.voivodeship,
      this.state.university,
      this.state.course
    ];

    if (this.state.price < 1 || this.state.price > 1000) {
      this.setState({ error: 'Nieprawidłowa cena!' });
      return true;
    }

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
            sending: false
          });
          window.scrollTo(0, 0);
          console.log(r);
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
            <a href="../protected" style={{ color: 'lightblue' }}>
              tutaj!
            </a>
          </div>
        )}

        {this.state.sending ? (
          <div className="sending-overlay">
            <div className="progress-text">
              <CircularProgress />
              <h1 className="h3">Wysyłane notatki</h1>
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
          <MyTextField
            id="name"
            className="field"
            label="Nazwa notatki"
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
                func: val => /^((?!kuu*rw|jee*bb*|huu*jj*|duu*p|pp*ii*ee*rr*d|cii*p|pii*zz*d).)*$/.test(val),
                message: 'Nie bluźnij !'
              }
            ]}
          />
          <MyTextField
            id="price"
            className="field"
            label="Cena"
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
            id="voivodeship"
            className="field"
            label="Województwo"
            variant="outlined"
            disabled
            value={this.state.voivodeship}
          />
          <MyTextField
            id="university"
            className="field"
            label="Uczelnia"
            variant="outlined"
            disabled
            value={this.state.university}
          />
          <MyTextField
            id="course"
            className="field"
            label="Kierunek"
            disabled
            variant="outlined"
            value={this.state.course}
          />

          <ListCourseSelector searchData={this.listCourseSelectorHandler} />

          <MyTextField
            id="description"
            label="Opis notatki"
            multiline
            rows="3"
            helperText="Max. 500 znaków..."
            inputProps={{ maxLength: 500 }}
            className="field description"
            variant="outlined"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <FormControl variant="outlined" className="semester-list">
            <InputLabel ref="Semester" htmlFor="outlined-age-native-simple">
              Semestr
            </InputLabel>
            <Select
              native
              id="semester"
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

          <div className="file-input">
            <input type="file" id="file" onChange={this.fileHandler} />
            <label for="file" class="btn-3">
              <span>Wybierz plik</span>
            </label>
          </div>
          <Button
            //type="submit"
            className="file-submit button"
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
