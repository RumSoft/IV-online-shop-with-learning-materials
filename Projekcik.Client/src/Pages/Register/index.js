import React from 'react';
import RegisterPanel from '../../Components/RegisterPanel';
import { Redirect } from 'react-router-dom';
import { AuthService } from '../../Services';

export const RegisterPage = () => {
  const data = {
    showTitle: true,
    title: 'Zarejestruj się'
  };
  return AuthService.isAuthenticated() ? (
    <Redirect to="/userpanel" />
  ) : (
    <div className="register-page">
      <RegisterPanel {...data} />
    </div>
  );
};
