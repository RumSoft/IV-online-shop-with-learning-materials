import React, { Component } from 'react';
import APIService from '../../Services/APIService';
import PaymentService from '../../Services/PaymentService';
import HrLabel from '../HrLabel/index';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import { Card, CardContent, Typography, ListItemText } from '@material-ui/core';
import { isError } from 'util';
export class UserPanel extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    APIService.get('api/user/me').then(user => {
      this.setState({ user });
    });
  }

  handlePayout() {
    PaymentService.payout('12312412412');
  }

  render() {
    const { user } = this.state;
    return (
      <div className="user-panel">
        <Grid container spacing={16}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Card className="note-data">
              <CardContent className="mx-auto">
                <Typography
                  component="h1"
                  className="title mx-auto"
                  variant="h4"
                  align="center"
                  color="textPrimary"
                  gutterBottom>
                  {user.name}
                </Typography>
            
                <h2>    <i className="fa fa-cog fa-spin" />
                  Witaj {user.userName}{' '}
                  <img src={user.pictureUrl} alt={user.userName} />w swoim
                  panelu użytkownika!
                </h2>

                <HrLabel text="Podgląd informacji" />
                <ListItemText
                  className="document-what"
                  primary={[
                    <i className="fa fa-user-cog" />,
                    'Twój unikalny id użytkownika'
                  ]}
                  secondary={user.id}
                />
                <br />
                <ListItemText
                  className="document-what"
                  primary={[
                    <i className="fa fa-envelope" />,
                    'Twój adres e-mail'
                  ]}
                  secondary={user.emailAddress}
                />
                <br />
                <ListItemText
                  className="document-what"
                  primary={[
                    <i className="fa fa-dollar-sign" />,
                    'Obecny stan konta'
                  ]}
                  secondary={user.balance}
                />
                <br/>
                <ListItemText
                  className="document-what"
                  primary={[
                    <i className="fa fa-hand-holding-usd" />,
                    'A może chcesz pieniędzy, biedaku?'
                  ]}
                />
                <br/>
                <Button
                  className="btn add-to-cart btn-md rounded-left rounded-right"
                  onClick={() => this.handlePayout()}>
                  <i className="fa fa-dollar-sign fa-spin" />
                  <i className="fa fa-dollar-sign fa-spin" />
                  <br />
                  wypłać {user.balance}zł
                </Button>               
                <p> notatki zakupione przeze mnie: </p>
                <i class="fa fa-spinner fa-pulse"/>
                <p> moje notatki:</p>
                <i class="fa fa-spinner fa-pulse"/>

                <p> Za zarobione pienądze możesz kupić sobie kawę </p>
                <i class="fa fa-coffee"/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default UserPanel;
