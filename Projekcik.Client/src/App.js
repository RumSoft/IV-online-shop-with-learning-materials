import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './router-config';
import './App.scss';
import NotFoundPage from './Pages/NotFound';
import Layout from './Pages/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
        </Switch>
      </Layout>
    );
  }
}

export default App;
