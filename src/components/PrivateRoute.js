import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ children, isAuthenticated, ...rest }) {
  return (
    <Route {...rest} render={() => isAuthenticated ? children : <Redirect to='/' />} />
  );
}

export default PrivateRoute;