import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import signupLoginApiCall from '../apiCalls/signupLoginApiCall';
import handleErrors from '../apiCalls/handleErrors';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    if (/\S@\S/.test(email) && password.length >= 6) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {user: {email: email, password: password}};
    signupLoginApiCall('http://localhost:3001/api/login', data)
    .then(handleErrors)
    .then(response => {
      const jwt = response.headers.get('Authorization');
      localStorage.setItem("token", jwt.split(' ')[1]);
      setRedirectHome(true);
      props.setToken(localStorage.getItem('token'));
      props.getUserID(localStorage.getItem('token'));
      props.setIsAuthenticated(true);
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="UserForm">
      <h1>Log in to ConnectU</h1>

      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} autoFocus={true}></input>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Log in</button>
      </form>

      <Link to="/signup">Sign up for ConnectU</Link>
      {redirectHome ? <Redirect to="/home" /> : null}
    </div>
  );
}

export default Login;