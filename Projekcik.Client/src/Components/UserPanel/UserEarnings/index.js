import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography } from '@material-ui/core';
import { Table } from 'reactstrap';
import { NoteService } from '../../../Services';
import './index.scss';

export default class UserEarnings extends Component {
  constructor(props) {
    super(props);
    NoteService.getUserEarnings().then(earnings => {
      if (earnings || earnings.length > 0) this.setState({ earnings });
      else this.setState({ earnings: [] });
    });
  }

  state = {
    earnings: null
  };

  render() {
    const { earnings } = this.state;
    console.log('earnings: ', earnings);
    return (
      <div>
        <h2 className="p-2 m-2">
          <i className="fa fa-money-bill" /> Historia zarobków
        </h2>
        {earnings !== null ? (
          <Table responsive striped bordered>
            <thead>
              <tr>
                <th>L.p.</th>
                <th>Nazwa notatki</th>
                <th>Cena</th>
                <th>Ilość zakupów</th>
                <th>Całkowity zysk</th>
              </tr>
            </thead>
            <tbody>
              {earnings &&
                earnings.map((earning, idx) => (
                  <tr key={idx}>
                    <th scope="row">{idx + 1}.</th>
                    <td>
                      <Link to={`/note/${earning.id}`}>{earning.name}</Link>
                    </td>
                    <td>{earning.price} zł</td>
                    <td>{earning.purchases}</td>
                    <td>{earning.profit} zł</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        ) : (
          <Typography className="text-center mb-2">
            Nie sprzedałeś obecnie żadnych notatek.
          </Typography>
        )}
      </div>
    );
  }
}