import React, { Component } from 'react';
import PaymentService from '../../Services/PaymentService';

export default class OrderNote extends Component {
  componentDidMount() {
    const notes = this.props.location.state.notes;
    let noteIds = notes.map(x => x.id);
    PaymentService.placeOrder(noteIds).then(r => {
      window.location.href = r.redirectUrl;
    });
  }

  render() {
    return (
      <div>
        <p>zostaniesz przekierowany na stronę obsługi płatności</p>
      </div>
    );
  }
}
