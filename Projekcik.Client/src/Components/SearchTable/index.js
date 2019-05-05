import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
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
  FormGroup
  // Button
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import NoteService from '../../Services/NoteService';
import './index.scss';

export default class NoteTable extends Component {
  constructor(props) {
    super(props);
    let id = 0;
    NoteService.getAllNotes().then(r => this.setState({ ...r, loaded: true }));
    this.toolbarHandler = this.toolbarHandler.bind(this);
  }
  state = {
    loaded: false,
    open: false,
    pager: {},
    notes: [],
    order: 'asc',
    orderBy: 'price'
  };

  toolbarHandler = data => {
    this.setState({ clicked: data.clicked, loaded: true });
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

  redirectToNote(id) {
    this.setState({ redirect: `/note/${id}` });
  }

  render() {
    const { open, loaded, order, orderBy, pager, notes } = this.state;

    if (this.state.redirect) return <Redirect to={this.state.redirect} />;

    return (
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
              <Button
                variant="outlined"
                className="button"
                style={{ marginTop: '20px' }}>
                Szukaj
              </Button>
            </CardBody>
          </Card>
        </Collapse>

        <div className="tableWrapper">
          <Table className="table" aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={notes.count}
            />
            <TableBody>
              {loaded &&
                notes.map((n, i) => (
                  <TableRow
                    className="row"
                    hover
                    onClick={() => this.redirectToNote(n.id)}
                    tabIndex={-1}
                    key={i}>
                    <TableCell
                      className="note-name"
                      component="th"
                      scope="row"
                      padding="default">
                      {n.name}
                    </TableCell>
                    <TableCell align="right">{n.price} zł</TableCell>
                    <TableCell align="right">{n.voivodeship.name}</TableCell>
                    <TableCell align="right">{n.university.name}</TableCell>
                    <TableCell align="right">{n.course.name}</TableCell>
                    <TableCell align="right">{n.semester}</TableCell>
                    <TableCell align="right">{n.author.name}</TableCell>
                    {/* </Link> */}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        {loaded && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={pager.count}
            rowsPerPage={pager.size}
            labelRowsPerPage="Ilość wyników na stronę:"
            page={pager.page - 1}
            backIconButtonProps={{
              'aria-label': 'Poprzednia Strona'
            }}
            nextIconButtonProps={{
              'aria-label': 'Następna Strona'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </Paper>
    );
  }
}
