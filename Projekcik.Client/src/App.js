import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import allRoutes from './router-config';
import './App.scss';
import NotFoundPage from './Pages/NotFound';
import Layout from './Pages/Layout';
import { ProtectedRoute } from './Components/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          {allRoutes.routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          {allRoutes.protectedRoutes.map((route, index) => (
            <ProtectedRoute
              key={index}
              path={route.path}
              component={route.component}
              exact={route.exact}
            />
          ))}
          {}
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
