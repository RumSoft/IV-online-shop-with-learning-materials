import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Typography, Grid } from '@material-ui/core';
import { Table } from 'reactstrap';
import { NoteService } from '../../../Services';
import './index.scss';
import { PieChart, Pie, Legend, Tooltip } from 'recharts';
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

    const colors = ['#99000d', '#cb181d', '#ef3b2c', '#fb6a4a', '#fc9272'];
    const data01 = earnings
      ? earnings
          .sort((x, y) => x.profit < y.profit)
          .filter((x, i) => i < 5)
          .map((x, i) => ({
            name: x.name,
            value: x.profit,
            fill: colors[i]
          }))
      : [];

    return (
      <div>
        <h2 className="p-2 m-2">
          <i className="fa fa-money-bill" /> Historia zarobków
        </h2>
        {earnings !== null ? (
          <Grid container spacing={8}>
            <Grid item md={8}>
              <Table responsive striped bordered>
                <thead>
                  <tr>
                    <th>L.p.</th>
                    <th>Notatka</th>
                    <th>Cena</th>
                    <th>Ilość</th>
                    <th>Zysk</th>
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
                  <tr>
                    <td />
                    <td />
                    <td />
                    <td />
                    <td>
                      <strong>Razem:</strong>{' '}
                      {earnings.reduce(
                        (total, earning) => total + earning.price,
                        0
                      )}{' '}
                      zł
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Grid>
            <Grid sm={4}>
              <h5 className="text-center">5 najbardziej dochodowych notatek</h5>
              <PieChart width={400} height={400}>
                <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data01}
                  cx={200}
                  cy={200}
                  outerRadius={80}
                  innerRadius={40}
                  fill="#8884d8"
                  label
                />
                <Tooltip />
              </PieChart>
            </Grid>
          </Grid>
        ) : (
          <Typography className="text-center mb-2">
            Nie sprzedałeś obecnie żadnych notatek.
          </Typography>
        )}
      </div>
    );
  }
}
