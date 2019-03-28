import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './Pages/Layout';
import routes from './router-config';
import NotFoundPage from './Pages/NotFound';
import './App.scss';

export default () => (
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
