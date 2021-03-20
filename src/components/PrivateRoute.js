import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, isAuthenticated, ...rest }) {
  useEffect(() => {
    if (!rest.redirectLocation) {
      rest.setRedirectLocation(rest.path);
    }
  })
  return (
    <Route {...rest} render={(props) => isAuthenticated ? <Component {...rest} {...props} /> : <Redirect to='/' />} />
  );
}

export default PrivateRoute;