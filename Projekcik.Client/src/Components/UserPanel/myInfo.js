import React from 'react';
import { Grid, ListItemText } from '@material-ui/core';
import PayoutDialog from './PayoutDialog';

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
        <PayoutDialog user={props.user}/>
      </Grid>
    </Grid>
  </div>
);

export default MyInfo;
