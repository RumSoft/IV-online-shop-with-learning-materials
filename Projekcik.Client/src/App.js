import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './router-config';
import './App.scss';
import NotFoundPage from './Pages/NotFound';
import Layout from './Pages/Layout';
import { ProtectedRoute } from './Components/ProtectedRoute';
import UserPanel from './Pages/User Page';

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
          <ProtectedRoute path="/protected" component={UserPanel} exact />
        </Switch>
      </Layout>
    );
  }
}

export default App;
