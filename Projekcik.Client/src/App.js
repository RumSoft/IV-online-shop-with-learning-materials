import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
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
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
