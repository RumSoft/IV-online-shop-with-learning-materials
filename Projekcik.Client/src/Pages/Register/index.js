import React from 'react';
import RegisterPanel from '../../Components/RegisterPanel';
import APIService from '../../Services/APIService';
import { Redirect } from 'react-router-dom';

export const RegisterPage = () => {
  const data = {
    showTitle: true,
    title: 'Zarejestruj się'
  };
  return APIService.isAuthenticated() ? (
    <Redirect to="/protected" />
  ) : (
    <div className="register-page">
      <RegisterPanel {...data} />
    </div>
  );
};
