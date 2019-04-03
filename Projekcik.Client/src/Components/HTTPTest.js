import React, { Component } from 'react';
import APIService from '../APIService';

export class HTTPTest extends Component {

    state = {
        firstName: "",
        lastName: "",
        userName: "",
        emailAddress: "",
        password: "",
        id: "",
    }

   

    handleClick = address => {
        this.setState({
            firstName: "asdf",
            lastName: "qweer",
            userName: "qaz",
            emailAddress: "ws@xe.com",
            password: "string",
            id: "3f8407b7-d375-4ce0-930c-9a7b7cd3a74a"
          }, () => {
            const logindata = {
              username: this.state.userName,
              password: this.state.password
            };
            APIService.post(address, logindata)
            .then(data => window.localStorage.setItem('token', `${data.token}`));
          });

        // const posted = APIService.post(address, this.state);
        // console.log(posted);
        // this.setState({token: posted.token})
        // console.log(this.state.token);
    }

    getData = id => {
       const got = APIService.get(`${id}`, this.state.token);
        console.log(got);
    }

  render() {
    return (
      <div>
        <button onClick={() => this.handleClick('api/Auth/register')}>Submit Data</button>
        <button onClick={() => this.handleClick('api/Auth/authenticate')}>Login Data</button> 
        <button onClick={() => this.getData(`api/Auth/me`)}>Get Data</button>

      </div>
    )
  }
}

export default HTTPTest
