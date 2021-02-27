import React from 'react';
import { Link } from 'react-router-dom';
import SignupLoginForm from './SignupLoginForm';

function Login(props) {

  return (
    <div className="UserForm">
      <h1>Log in to ConnectU</h1>

      <SignupLoginForm 
        setToken={props.setToken}
        getUserID={props.getUserID}
        setIsAuthenticated={props.setIsAuthenticated}
      />

      <Link to="/signup">Sign up for ConnectU</Link>
    </div>
  );
}

export default Login;