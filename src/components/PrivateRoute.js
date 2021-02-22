import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  return (
    <Route {...rest} render={(props) => isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to='/' />} />
  );
}

export default PrivateRoute;