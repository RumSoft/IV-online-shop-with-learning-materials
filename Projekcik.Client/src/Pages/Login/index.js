import React from 'react';
import './index.scss';
import LoginPanel from '../../Components/LoginPanel';
import APIService from '../../Services/APIService';
import { Redirect } from 'react-router-dom';

export const LoginPage = () => {
  return APIService.isAuthenticated() ? (
    <Redirect to="/protected" />
  ) : (
    <div className="login-page">
      <LoginPanel />
    </div>
  );
};
