import React, { useState, useEffect } from 'react';
import signupLoginApiCall from '../apiCalls/signupLoginApiCall';

function SignupLoginForm(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);

  useEffect(() => {
    function validateForm() {
      if (props.signup) {
        return /^[a-zA-Z]/.test(name) && /\S@\S/.test(email) && password.length >= 6;
      } else {
        return /\S@\S/.test(email) && password.length >= 6;
      }
    };

    if (validateForm()) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [name, email, password, props.signup]);

  function handleSubmit(e) {
    e.preventDefault();
    const data = props.signup ? {user: {name: name, email: email, password: password}} : {user: {email: email, password: password}}
    const url = props.signup ? 'signup' : 'login'
    signupLoginApiCall(`http://localhost:3001/api/${url}`, data)
    .then(token => {
      if (token) {
        props.setToken(token);
        props.getUserID(token);
        props.setIsAuthenticated(true);
      }
    })
  };

  return (
    <form onSubmit={handleSubmit}>
      {props.signup 
      ? <input 
          type="text" 
          placeholder="Name" 
          onChange={(e) => setName(e.target.value)} 
          autoFocus={true} 
        /> 
      : null}

      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => setEmail(e.target.value)} 
        autoFocus={props.signup ? false : true}
      />

      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)}
      />

      <button 
        className={invalidForm ? "invalidForm": "colorButton"} 
        type="submit"
      >
        {props.signup ? 'Sign up' : 'Log in'}
      </button>
    </form>
  );
}

export default SignupLoginForm;