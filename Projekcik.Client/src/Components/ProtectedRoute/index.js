import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import APIService from '../../Services/APIService';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  window.localStorage.setItem('accessedUrl', `${window.location.href}`);
  return (
    <Route
      {...rest}
      render={props => {
        if (APIService.isAuthenticated()) {
          window.localStorage.removeItem('accessedUrl');
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
