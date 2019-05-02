import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Paper,
  Collapse,
  Typography
} from '@material-ui/core';
import {
  Card,
  CardBody,
  Input,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Label,
  FormGroup
} from 'reactstrap';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import NoteService from '../../Services/NoteService';
import './index.scss';

//////////////////////////SORTING METHODS////////////////////////////////////

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

//////////////////////////SORTING METHODS////////////////////////////////////

export default class NoteTable extends Component {
  constructor(props) {
    super(props);
    let id = 0;
    NoteService.getAllNotes().then(r => {
      // let pager = Object.entries(r)[0][1];
      let notes = Object.entries(r)[1][1];
      // console.log(notes);
      for (var note of notes) {
        id += 1;
        this.setState({
          data: [
            ...this.state.data,
            {
              id: id,
              name: note.name,
              price: note.price,
              voi: note.voivodeship.name,
              uni: note.university.name,
              course: note.course.name,
              author: note.author.name
            }
          ]
        });
      }
    });
    this.toolbarHandler = this.toolbarHandler.bind(this);
  }
  state = {
    order: 'asc',
    orderBy: 'price',
    data: [],
    courses: [],
    page: 0,
    rowsPerPage: 10,
    clicked: false
  };

  toolbarHandler = data => {
    this.setState({ clicked: data.clicked });
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleClick = (event, id) => {
    console.log('Clicked row no.' + id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  // isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const {
      data,
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      clicked
    } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper className="root">
        <EnhancedTableToolbar filterData={this.toolbarHandler} />

        <Collapse in={clicked}>
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
                  <Label for="voi">Województwo</Label>
                  <InputGroup className="filter-field">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="voi" placeholder="Województwo" />
                  </InputGroup>

                  <Label for="uni">Uczelnia</Label>
                  <InputGroup className="filter-field">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="uni" placeholder="Uczelnia" />
                  </InputGroup>

                  <Label for="course">Kierunek</Label>
                  <InputGroup className="filter-field">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input id="course" placeholder="Kierunek" />
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
                    <Input id="price-input" placeholder="Od" />
                    <InputGroupAddon className="mr-3" addonType="append">
                      PLN
                    </InputGroupAddon>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <Input addon type="checkbox" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input placeholder="Do" />
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
                    />
                  </FormGroup>
                </div>
              </div>
            </CardBody>
          </Card>
        </Collapse>

        <div className="tableWrapper">
          <Table className="table" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  // const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      className="row"
                      hover
                      onClick={event => this.handleClick(event, n.id)}
                      tabIndex={-1}
                      key={n.id}>
                      <TableCell
                        className="note-name"
                        component="th"
                        scope="row"
                        padding="default">
                        {n.name}
                      </TableCell>
                      <TableCell align="right">{n.price} zł</TableCell>
                      <TableCell align="right">{n.voi}</TableCell>
                      <TableCell align="right">{n.uni}</TableCell>
                      <TableCell align="right">{n.course}</TableCell>
                      <TableCell align="right">{n.semester}</TableCell>
                      <TableCell align="right">{n.author}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage="Ilość wyników na stronę:"
          page={page}
          backIconButtonProps={{
            'aria-label': 'Poprzednia Strona'
          }}
          nextIconButtonProps={{
            'aria-label': 'Następna Strona'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
