import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../Store/Values';

//testowa stronka testująca testowy ValuesController

class ValuesPage extends Component {
  componentDidMount() {
    // This method is called when the component is first added to the document
    this.ensureDataFetched();
  }

  componentDidUpdate() {
    // This method is called when the route parameters change
    this.ensureDataFetched();
  }

  ensureDataFetched() {
    this.props.requestValues();
  }

  render() {
    return (
      <div>
        <h1>text</h1>
        <p>test test test</p>
        {renderValues(this.props)}
      </div>
    );
  }
}

function renderValues(props) {
  return props.values.length > 0 ? (
    <ul>
      {props.values.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  ) : (
    <span>brak danych</span>
  );
}

export default connect(
  state => state.values,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(ValuesPage);
