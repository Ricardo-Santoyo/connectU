import React from 'react';
import { Link } from 'react-router-dom';
import SignupLoginForm from './SignupLoginForm';

function Signup(props) {

  return (
    <div className="UserForm">
      <h1>Create your account</h1>

      <SignupLoginForm 
        signup={true}
        setToken={props.setToken}
        getUserID={props.getUserID}
        setIsAuthenticated={props.setIsAuthenticated}
      />

      <Link to="/login">Log in to ConnectU</Link>
    </div>
  );
}

export default Signup;