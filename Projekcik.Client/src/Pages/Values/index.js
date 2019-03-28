import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import axios from 'axios';
import './index.scss';
import Button from '@material-ui/core/Button';
import {
  Card,
  Input,
  ListItem,
  List,
  CircularProgress,
  Paper,
  Grid
} from '@material-ui/core';

//
// .---------------#### WAZNE! #### ----------------------------------------.
// :                                                                        :
// :  testowa stronka testująca testowy ValuesController                    :
// :  nie bazować na tym przykladzie, szukac tutoriali w google             :
// :  bo to jest na szybko zrobione xd szybko w chuj                        :
// :                                                                        :
// '------------------------------------------------------------------------'
//

export default class ValuesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      values: null,
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);

    this.loadData();
  }

  loadData() {
    this.setState({
      loading: true
    });
    let baseUrl = 'https://projekcik-prz.azurewebsites.net';
    let url = `${baseUrl}/api/values`;
    let message = { text: this.state.text };
    console.log(url, message);
    axios
      .get(url, message)
      .then(r => {
        console.log(r.data);
        this.setState({
          values: [...r.data]
        });
      })
      .catch(e => {
        this.setState({
          values: []
        });
      })
      .finally(() => {
        this.setState({
          loading: false
        });
      });
  }

  sendMessage() {
    let baseUrl = 'https://projekcik-prz.azurewebsites.net';
    let url = `${baseUrl}/api/values`;
    let message = { text: this.state.text };
    axios.post(url, message).then(r => {
      this.setState({
        values: [...this.state.values, message.text]
      });
    });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <Card className="valuesPage">
        {this.state.loading && <CircularProgress className="loadingIcon" />}
        <h1>text</h1>
        <p>test test test</p>
        {this.state.loading ? (
          <span>loading</span>
        ) : (
          this.renderValues(this.state.values)
        )}
        <hr />

        <Input
          className="input"
          placeholder="Wpisz cos wlasnego "
          name="text"
          value={this.state.text}
          onChange={this.handleChange}
        />

        <Button
          className="send"
          variant="contained"
          color="primary"
          onClick={this.sendMessage}>
          Send
        </Button>
      </Card>
    );
  }

  renderValues(data) {
    return data && data.length > 0 ? (
      <Grid
        container
        xs={12}
        spacing={24}
        justify="center"
        className="messages">
        {data.map((text, i) => (
          <Grid item xs={3}>
            <Paper className="message" key={i}>
              {text}
            </Paper>
          </Grid>
        ))}
      </Grid>
    ) : (
      <Grid xs={3}>brak danych</Grid>
    );
  }
}
