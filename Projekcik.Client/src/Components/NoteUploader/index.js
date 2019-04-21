import React, { Component } from 'react';
import NoteService from '../../Services/NoteService';
import {
  ListGroup,
  ListGroupItem,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent
} from 'reactstrap';
import UniService from '../../Services/UniService';
import classnames from 'classnames';
import {
  Card,
  TextField,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Select,
  CircularProgress,
  FormControl,
  OutlinedInput,
  InputLabel
} from '@material-ui/core';
import './index.scss';

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

      voivodeships: [],
      universities: [],
      courses: [],
      voivodeshipId: '',
      universityId: '',
      voivodeship: '',
      university: '',
      course: '',

      open: false,
      loading: false,
      activeTab: 1,
      disabledTabs: 2,
      filterText: ''
    };
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

  handleDialogOpen = () => {
    this.setState({ open: true, loading: true }, () =>
      UniService.getVoivodeships().then(data =>
        this.setState({ voivodeships: data, loading: false })
      )
    );
  };

  handleDialogClose = arg => {
    let stateUpdate = {
      open: false,
      loading: false,
      disabledTabs: 2,
      activeTab: 1
    };
    if (arg !== 'send') {
      stateUpdate = {
        ...stateUpdate,
        voivodeship: '',
        university: '',
        course: ''
      };
    }
    this.setState(stateUpdate);
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  filterList = list => {
    return (list = list.filter(
      item =>
        item.name.toLowerCase().indexOf(this.state.filterText.toLowerCase()) >=
        0
    )).map(item => {
      return (
        <ListGroupItem
          className="mb-1 md text-center"
          key={item.id}
          tag="button"
          action
          onClick={() =>
            this.handleTabChange(this.state.activeTab, item.id, item.name)
          }>
          {item.name}
        </ListGroupItem>
      );
    });
  };

  handleTabChange(currentTab, itemId, itemName) {
    if (currentTab === 1) {
      this.setState(
        {
          disabledTabs: 1,
          voivodeshipId: itemId,
          voivodeship: itemName
        },
        () => {
          UniService.getUniversities(this.state.voivodeshipId).then(data =>
            this.setState({ universities: data })
          );
        }
      );
    } else if (currentTab === 2) {
      this.setState(
        {
          disabledTabs: 0,
          universityId: itemId,
          university: itemName
        },
        () => {
          UniService.getCourses(this.state.universityId).then(data =>
            this.setState({ courses: data })
          );
        }
      );
    } else if (currentTab === 3) {
      this.setState({ courseId: itemId, course: itemName });
    }
  }

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
    const { voivodeships, universities, courses, disabledTabs } = this.state;
    const voiData = this.filterList(voivodeships);
    const uniData = this.filterList(universities);
    const courseData = this.filterList(courses);

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
          <Button
            className="button"
            variant="outlined"
            color="primary"
            onClick={this.handleDialogOpen}>
            Wybierz uczelnię i kierunek
          </Button>

          {/* ////////////BEGIN DIALOG/////////////////////////////////// */}

          <Dialog
            open={this.state.open}
            onClose={this.handleDialogClose}
            aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
              Wybór uczelni i kierunku
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="mb-2">
                Wybierz województwo, wyszukaj swoją uczelnię, a następnie
                wybierz kierunek odpowiadający Twojej notatce...
              </DialogContentText>

              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === 1
                    })}
                    onClick={() => {
                      this.toggle(1);
                    }}>
                    Województwo
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === 2
                    })}
                    disabled={disabledTabs > 1}
                    onClick={() => {
                      this.toggle(2);
                    }}>
                    Uczelnia
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === 3
                    })}
                    disabled={disabledTabs > 0}
                    onClick={() => {
                      this.toggle(3);
                    }}>
                    Kierunek
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TextField
                  id="filterText"
                  className="field mb-3 mt-3"
                  label="Wyszukaj..."
                  fullWidth
                  value={this.state.filterText}
                  onChange={this.handleChange}
                />
                <TabPane tabId={1} className="mb-2">
                  {this.state.loading && (
                    <div className="text-center mb-3">
                      <CircularProgress />
                    </div>
                  )}

                  <ListGroup>{voiData}</ListGroup>
                </TabPane>

                <TabPane tabId={2}>
                  {this.state.loading && (
                    <div className="text-center mb-3">
                      <CircularProgress />
                    </div>
                  )}
                  <ListGroup>{uniData}</ListGroup>
                </TabPane>

                <TabPane tabId={3}>
                  {this.state.loading && (
                    <div className="text-center mb-3">
                      <CircularProgress />
                    </div>
                  )}
                  <ListGroup>{courseData}</ListGroup>
                </TabPane>
              </TabContent>
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleDialogClose} color="primary">
                Powrót
              </Button>
              <Button
                onClick={() => this.handleDialogClose('send')}
                disabled={this.state.course === ''}
                color="primary">
                Wyślij
              </Button>
            </DialogActions>
          </Dialog>

          {/* //////////END DIALOG////////////////////////////////////// */}

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
