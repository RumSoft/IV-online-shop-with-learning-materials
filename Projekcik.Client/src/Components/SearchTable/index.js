import React, { Component } from 'react';
import {
  CircularProgress,
  Paper,
  Collapse,
  Typography,
  Button
} from '@material-ui/core';
import {
  Card,
  CardBody,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  FormGroup,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import EnhancedTableToolbar from './TableToolbar';
import NoteService from '../../Services/NoteService';
import queryString from 'query-string';

import './index.scss';

export default class NoteTable extends Component {
  constructor(props) {
    super(props);
    const urlParam = new URLSearchParams(window.location.search);
    const query = urlParam.get('query');
    if (query !== null) {
      urlParam.set('noteName', `${query}`);
      NoteService.getAllNotes(`?${urlParam.toString()}`).then(r => {
        urlParam.delete('noteName');
        this.setState({
          ...r,
          loaded: true,
          q: urlParam.toString()
        });
      });
    } else {
      NoteService.getAllNotes(window.location.search).then(r =>
        this.setState({ ...r, loaded: true })
      );
    }
    this.toolbarHandler = this.toolbarHandler.bind(this);
  }
  state = {
    q: '',
    loaded: false,
    open: false,
    page: null,
    size: null,
    notes: [],

    noteData: {
      noteName: '',
      voivodeship: '',
      university: '',
      course: '',
      SortOrder: '',
      SortBy: ''
    }
  };

  toolbarHandler = data => {
    data.clicked === this.state.open
      ? this.setState(
          {
            noteData: {
              ...this.state.noteData,
              SortBy: data.sortBy,
              SortOrder: data.sortOrder
            }
          },
          () => this.handleQuery()
        )
      : this.setState({ open: data.clicked });
  };

  handleQuery = () => {
    const queryObject = {
      ...this.state.noteData
    };
    queryObject.page = this.state.page;
    queryObject.size = this.state.size;

    for (var prop in queryObject) {
      if (queryObject[prop] === null || queryObject[prop] === '') {
        delete queryObject[prop];
      }
    }
    console.log(queryObject);
    let query = queryString.stringify(queryObject);
    console.log(query);
    window.history.pushState(
      window.location.pathname,
      null,
      window.location.pathname + '?' + this.state.q + '&' + query
    );
    this.setState({ loaded: false }, () =>
      NoteService.getAllNotes(window.location.search).then(r =>
        this.setState({ ...r, loaded: true })
      )
    );
  };

  handleChange = event => {
    this.setState({
      noteData: {
        ...this.state.noteData,
        [event.target.id]: event.target.value
      }
    });
  };

  handlePageChange = event => {
    this.setState(
      {
        page: event.target.id
      },
      () => this.handleQuery()
    );
  };

  handlePageCount = event => {
    this.setState(
      {
        size: event.target.value
      },
      () => this.handleQuery()
    );
  };

  redirectToNote = id => {
    this.setState({ redirect: `/note/${id}` });
  };

  render() {
    const { open, loaded, notes } = this.state;

    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    return (
      <div>
        <Paper className="root">
          <EnhancedTableToolbar filterData={this.toolbarHandler} />

          <Collapse in={open}>
            <Card className="filter-list">
              <CardBody>
                <Typography className="filter-header" variant="h6">
                  Parametry wyszukiwania
                  <Typography variant="caption">
                    Wybierz kryteria, na podstawie których chcesz wyszukać
                    notatkę.
                  </Typography>
                </Typography>
                <hr />
                <div className="grid-container">
                  <div className="filter-left ">
                    <Label for="voivodeship">Województwo</Label>
                    <InputGroup className="filter-field">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input addon type="checkbox" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="voivodeship"
                        placeholder="Województwo"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <Label for="university">Uczelnia</Label>
                    <InputGroup className="filter-field">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input addon type="checkbox" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="university"
                        placeholder="Uczelnia"
                        onChange={this.handleChange}
                      />
                    </InputGroup>

                    <Label for="course">Kierunek</Label>
                    <InputGroup className="filter-field">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input addon type="checkbox" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="course"
                        placeholder="Kierunek"
                        onChange={this.handleChange}
                      />
                    </InputGroup>
                  </div>

                  <div className="filter-rest">
                    <Label for="price-input">Cena</Label>
                    <InputGroup className="filter-field rest">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input addon type="checkbox" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        id="price-input"
                        placeholder="Od"
                        onChange={this.handleChange}
                      />
                      <InputGroupAddon className="mr-3" addonType="append">
                        PLN
                      </InputGroupAddon>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <Input addon type="checkbox" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Do" onChange={this.handleChange} />
                      <InputGroupAddon addonType="append">PLN</InputGroupAddon>
                    </InputGroup>

                    <FormGroup className="filter-field rest">
                      <Label for="date-submitted">Data dodania notatki</Label>
                      <Input
                        type="date"
                        id="date-submitted"
                        placeholder="date placeholder"
                      />
                    </FormGroup>
                    <FormGroup className="filter-field rest">
                      <Label for="author-input">Autor notatki</Label>
                      <Input
                        id="author-input"
                        placeholder="Imię, nazwisko lub nazwa użytkownika"
                        onChange={this.handleChange}
                      />
                    </FormGroup>
                  </div>
                </div>
                <Button
                  variant="outlined"
                  className="button"
                  onClick={this.handleQuery}
                  style={{ marginTop: '20px' }}>
                  Szukaj
                </Button>
              </CardBody>
            </Card>
          </Collapse>
          <hr />
          <div />
          <div className="page-manipulator">
            <Pagination className="page-number">
              <PaginationItem disabled className="page-item">
                <PaginationLink previous />
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 1}>
                <PaginationLink id={1} onClick={this.handlePageChange}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 2}>
                <PaginationLink id={2} onClick={this.handlePageChange}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 3}>
                <PaginationLink id={3} onClick={this.handlePageChange}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 4}>
                <PaginationLink id={4} onClick={this.handlePageChange}>
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem className="page-item">
                <PaginationLink next />
              </PaginationItem>
            </Pagination>
            <Label for="size" className="label">
              Ilość wyników na stronę
            </Label>
            <Input
              type="select"
              className="pageSize"
              id="size"
              defaultValue={10}
              onChange={this.handlePageCount}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Input>
          </div>
          {loaded ? (
            notes.map((note, i) => (
              <Card
                tag="a"
                id={i}
                className="note-card p-2 m-2"
                onClick={() => this.redirectToNote(note.id)}>
                <div className="note-image">
                  <img
                    className="p-2 m-2"
                    style={{
                      width: 128,
                      height: 128
                    }}
                    src="http://placekitten.com/g/400/400"
                    alt="notePreview"
                  />
                  <h5>{note.name}</h5>
                  <dl>
                    <Typography>
                      Województwo: {note.voivodeship.name}
                    </Typography>
                    <Typography />
                    <Typography>
                      Uczelnia: {note.university.name}
                    </Typography>{' '}
                    <Typography />
                    <Typography>Kierunek: {note.course.name}</Typography>{' '}
                    <Typography />
                  </dl>
                </div>
                <div className="origin" />
              </Card>
            ))
          ) : (
            <div className="text-center">
              <CircularProgress />
            </div>
          )}
          <hr />
          <div className="page-manipulator">
            <Pagination
              aria-label="Page navigation example"
              className="page-number">
              <PaginationItem disabled>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 1}>
                <PaginationLink id={1} onClick={this.handlePageChange}>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 2}>
                <PaginationLink id={2} onClick={this.handlePageChange}>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 3}>
                <PaginationLink id={3} onClick={this.handlePageChange}>
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem
                className="page-item"
                active={this.state.page === 4}>
                <PaginationLink id={4} onClick={this.handlePageChange}>
                  4
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationLink next />
              </PaginationItem>
            </Pagination>
            <Label for="size" className="label">
              Ilość wyników na stronę
            </Label>
            <Input
              type="select"
              className="pageSize"
              id="size"
              defaultValue={10}
              onChange={this.handlePage}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Input>
          </div>
        </Paper>
      </div>
    );
  }
}
