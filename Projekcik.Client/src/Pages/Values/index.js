import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../Store/Values';
import axios from 'axios';
import './index.scss';
import Button from '@material-ui/core/Button';
import { Card, Input, ListItem, ListItemText, List } from '@material-ui/core';

//
// .---------------#### WAZNE! #### ----------------------------------------.
// :                                                                        :
// :  testowa stronka testująca testowy ValuesController                    :
// :  nie bazować na tym przykladzie, szukac tutoriali w google             :
// :  bo to jest na szybko zrobione xd szybko w chuj                        :
// :                                                                        :
// '------------------------------------------------------------------------'
//

class ValuesPage extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.requestValues();
  }

  sendMessage() {
    let baseUrl = 'https://projekcik-prz.azurewebsites.net';
    let url = `${baseUrl}/api/values`;
    let message = { text: this.state.text };
    console.log(url, message);
    axios
      .post(url, message)
      .then(r => {
        this.props.requestValues();
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <Card className="valuesPage">
        <h1>text</h1>
        <p>test test test</p>
        {this.props.isLoading ? <span>loading</span> : renderValues(this.props)}
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
          onClick={() => this.sendMessage()}>
          Send
        </Button>
      </Card>
    );
  }
}

function renderValues(props) {
  return props.values.length > 0 ? (
    <List className="messageList">
      {props.values.map((text, i) => (
        <ListItem className="message" key={i}>
          {text}
        </ListItem>
      ))}
    </List>
  ) : (
    <span>brak danych</span>
  );
}

export default connect(
  state => state.values,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ValuesPage);
