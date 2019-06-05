import React, { Component } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Grid
} from '@material-ui/core';
import { Form, FormGroup } from 'reactstrap';
import PaymentService from '../../Services/PaymentService';
import MyTextField from '../MyTextField';

export default class PayoutDialog extends Component {
  state = {
    open: false,
    firstName: '',
    lastName: '',
    accountNumber: '',
    transferTitle: '',
    errorMessage: null
  };
  forms = {};

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event && event.preventDefault();

    let forms = Object.keys(this.forms).map(key => this.forms[key]);
    let isValid = forms.every(x => x.isValid());
    if (!isValid) {
      this.setState(
        {
          errorMessage: 'Wypełnij poprawnie wszystkie pola',
          loading: false
        },
        () => this.handlePayout(document.getElementById('accountNumber').value)
      );
    }
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handlePayout(accountNumber) {
    PaymentService.payout(accountNumber).then(x => {
      this.loadMyInfo();
      this.setState({ open: false });
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <Grid container>
          <Grid item>
            <div className="btn-group">
              {user.balance >= 1 ? (
                <Button
                  style={{ maxWidth: '400px' }}
                  className="btn bg-success btn-buy"
                  onClick={() => this.handleClickOpen()}>
                  <Grid container>
                    <Grid item sm={5} className="text-right">
                      <i className=" fa fa-dollar-sign fa-spin d-none d-sm-inline-block" />
                    </Grid>
                    <Grid item xs={12} sm={7} className="text-left">
                      {' '}
                      wypłać całą swoją fortunę
                      <h3>{user.balance} zł</h3>
                    </Grid>
                  </Grid>
                </Button>
              ) : (
                <Button
                  style={{ maxWidth: '400px' }}
                  className="btn bg-warning btn-buy"
                  disabled
                  onClick={() => this.handleClickOpen()}>
                  <Grid container>
                    <Grid item sm={5} className="text-right">
                      <i className=" fa fa-dollar-sign fa-spin d-none d-sm-inline-block" />
                    </Grid>
                    <Grid item xs={12} sm={7} className="text-left">
                      {' '}
                      Nie stać cię aby wypłacić
                      <h3>{user.balance} zł</h3>
                    </Grid>
                  </Grid>
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Wypłać pieniądze</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Wypełnij poniższe pola swoimi danymi, aby móc dokonać wypłaty.
              Upewnij się, że dane nie zawierają błędów, po czym zatwierdź
              operację.
            </DialogContentText>
            <hr />
            <Form>
              <FormGroup>
                <MyTextField
                  ref={r => {
                    this.forms.firstName = r;
                  }}
                  id="firstName"
                  className="field"
                  label="Imię"
                  variant="outlined"
                  showError={this.state.errorMessage}
                  inputProps={{ maxLength: 30 }}
                  value={this.state.firstName}
                  onChange={this.handleChange}
                  validationRules={[
                    {
                      func: val => val,
                      message: 'Imię jest wymagane'
                    },
                    {
                      func: val => /^[a-zA-ZęóąśłżźćńĘÓĄŚŁŻŹĆŃ]+$/.test(val),
                      message: 'Nieprawidłowy format'
                    }
                  ]}
                />
              </FormGroup>
              <FormGroup>
                <MyTextField
                  ref={r => {
                    this.forms.lastName = r;
                  }}
                  id="lastName"
                  className="field"
                  showError={this.state.errorMessage}
                  label="Nazwisko"
                  variant="outlined"
                  inputProps={{ maxLength: 30 }}
                  value={this.state.lastName}
                  onChange={this.handleChange}
                  validationRules={[
                    {
                      func: val => val,
                      message: 'Nazwisko jest wymagane'
                    },
                    {
                      func: val => /^[a-zA-Z]+$/.test(val),
                      message: 'Nieprawidłowy format'
                    }
                  ]}
                />
              </FormGroup>
              <FormGroup>
                <MyTextField
                  id="accountNumber"
                  className="field"
                  showError={this.state.errorMessage}
                  label="Numer konta"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  value={this.state.accountNumber}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <MyTextField
                  id="transferTitle"
                  className="field"
                  showError={this.state.errorMessage}
                  label="Tytuł przelewu"
                  variant="outlined"
                  inputProps={{ maxLength: 100 }}
                  value={this.state.transferTitle}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </Form>
            <hr />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleSubmit()} color="primary">
              Zatwierdź
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
