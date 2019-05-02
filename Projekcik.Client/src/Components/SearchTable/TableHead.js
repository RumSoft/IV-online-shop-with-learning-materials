import React, { Component } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import './index.scss';

const rows = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nazwa notatki'
  },
  { id: 'price', numeric: true, disablePadding: false, label: 'Cena' },
  { id: 'voi', numeric: true, disablePadding: false, label: 'Województwo' },
  { id: 'uni', numeric: true, disablePadding: false, label: 'Uczelnia' },
  { id: 'course', numeric: true, disablePadding: false, label: 'Kierunek' },
  { id: 'semester', numeric: true, disablePadding: false, label: 'Semestr' },
  { id: 'author', numeric: true, disablePadding: false, label: 'Autor' }
];

export default class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}>
                <Tooltip
                  title="Sortuj"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={200}>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this
          )}
        </TableRow>
      </TableHead>
    );
  }
}
