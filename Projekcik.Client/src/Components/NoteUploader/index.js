import React, { Component } from 'react';
import NoteService from '../../Services/NoteService';
import {
  Card,
  TextField,
  Button,
  Select,
  FormControl,
  OutlinedInput,
  InputLabel
} from '@material-ui/core';
import './index.scss';
import ListCourseSelector from '../ListCourseSelector';

export default class NoteUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      file: null,
      name: '',
      price: '',
      description: '',
      semester: 0,
      courseId: null,

      voivodeship: '',
      university: '',
      course: ''
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

  fileHandler = event => {
    this.setState({ file: event.target.files[0] }, () =>
      console.log(this.state.file)
    );
  };

  handleSubmit = () => {
    let note = new FormData();
    note.append('file', this.state.file);
    note.append('name', this.state.name);
    note.append('price', this.state.price);
    note.append('description', this.state.description);
    note.append('semester', this.state.semester);
    note.append('course', this.state.courseId);

    NoteService.sendNote(note).then(r => console.log(r));
  };

  render() {
    return (
      <Card className="upload-page-card mb-2">
        <div className="note-upload-header">
          <h3>Dodaj nową notatkę</h3>
          <hr />
        </div>
        <form className="note-form">
          <TextField
            id="name"
            className="field"
            label="Nazwa notatki"
            variant="outlined"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <TextField
            id="price"
            className="field"
            label="Cena"
            variant="outlined"
            helperText="Format po kropce np. '13.37'..."
            value={this.state.price}
            onChange={this.handleChange}
          />
          <TextField
            id="voivodeship"
            className="field"
            label="Województwo"
            variant="outlined"
            disabled
            value={this.state.voivodeship}
          />
          <TextField
            id="university"
            className="field"
            label="Uczelnia"
            variant="outlined"
            disabled
            value={this.state.university}
          />
          <TextField
            id="course"
            className="field"
            label="Kierunek"
            disabled
            variant="outlined"
            value={this.state.course}
          />

          <ListCourseSelector searchData={this.listCourseSelectorHandler} />

          <TextField
            id="description"
            label="Opis notatki"
            multiline
            rows="3"
            helperText="Max. 200 znaków..."
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
          <input
            className="file-submit"
            type="file"
            onChange={this.fileHandler}
          />
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
