import React, { Component } from 'react';
import APIService from '../../Services/APIService';

export class Protected extends Component {

    handleClick = event => {
        const bool = APIService.isAuthenticated();
        console.log(bool);
    }

    render() {
        return (
            <div>
                <h1>Protected Page</h1>
                <button onClick={this.handleClick}>Click me!</button>
            </div>
        )
    }
}

export default Protected
