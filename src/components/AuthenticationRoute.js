import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function AuthenticationRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route {...rest} render={(props) => !isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to='/home' />} />
  );
}

export default AuthenticationRoute;