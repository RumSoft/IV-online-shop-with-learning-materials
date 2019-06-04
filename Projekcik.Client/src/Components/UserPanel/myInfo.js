import React from 'react';
import { Grid, Button, ListItemText } from '@material-ui/core';

const MyInfo = props => (
  <div className="row m-4">
    <Grid container>
      <Grid item md={6}>
        <Grid item>
          <ListItemText
            className="document-what m-3"
            primary={[
              <i className="fa fa-user-cog" />,
              'Twój unikalny id użytkownika'
            ]}
            secondary={props.user.id}
          />
        </Grid>
        <Grid item>
          <ListItemText
            className="document-what m-3"
            primary={[
              <i className="fa fa-user" />,
              'Imię i nazwisko użytkownika'
            ]}
            secondary={`${props.user.firstName} ${props.user.lastName}`}
          />
        </Grid>
        <Grid item>
          <ListItemText
            className="document-what m-3"
            primary={[<i className="fa fa-envelope" />, 'Twój adres e-mail']}
            secondary={props.user.emailAddress}
          />
        </Grid>
      </Grid>
      <Grid item md={6}>
        <Grid item>
          <ListItemText
            className="document-what m-3"
            primary={[<i className="fa fa-dollar-sign" />, 'Obecny stan konta']}
            secondary={props.user.balance}
          />
        </Grid>
        <Grid item>
          <ListItemText
            className="document-what m-3"
            primary={[
              <i className="fa fa-hand-holding-usd" />,
              'A może chcesz wypłacić swoje pieniądze?'
            ]}
          />
        </Grid>
        <Grid item>
          <div className="btn-group">
            <Button
              style={{ maxWidth: '400px' }}
              className="btn bg-success btn-buy"
              onClick={() => props.handleDialog()}>
              <Grid container>
                <Grid item sm={5} className="text-right">
                  <i className=" fa fa-dollar-sign fa-spin d-none d-sm-inline-block" />
                </Grid>
                <Grid item xs={12} sm={7} className="text-left">
                  {' '}
                  wypłać całą swoją fortunę
                  <h3>{props.user.balance} zł</h3>
                </Grid>
              </Grid>
            </Button>
          </div>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

export default MyInfo;
