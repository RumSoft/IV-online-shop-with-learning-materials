import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './index.scss';

export default class CookieNoticeBar extends Component {
  constructor(props) {
    super(props);
    if (window.localStorage.getItem('cookiesAccepted') === 'true')
      this.state.visible = false;
  }

  state = {
    redirect: null,
    visible: true
  };

  handleAccept() {
    window.localStorage.setItem('cookiesAccepted', 'true');
    this.setState({ visible: false });
  }

  render() {
    const { visible } = this.state;

    return visible ? (
      <div className="cookie-notice">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-6 col-sm-7 col-md-auto">
              Ta strona używa plików cookies. Zapoznaj się z naszą polityką
              prywatności, aby uzyskać więcej informacji
            </div>
            <div className="btn-group col-6 col-sm-5 col-md">
              <Button
                className="btn accept rounded-right"
                onClick={() => this.handleAccept()}>
                Akceptuj ciasteczka
              </Button>
              <Button outline className="btn rodo rounded-left" href="/rodo">
                Polityka Prywatności
              </Button>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
