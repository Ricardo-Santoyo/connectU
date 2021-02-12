import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import signupLoginApiCall from '../apiCalls/signupLoginApiCall';
import handleErrors from '../apiCalls/handleErrors';

function Signup(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);
  const [redirectHome, setRedirectHome] = useState(false);

  useEffect(() => {
    if (/^[a-zA-Z]/.test(name) && /\S@\S/.test(email) && password.length >= 6) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [name, email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    let data = {user: {name: name, email: email, password: password}};
    signupLoginApiCall('http://localhost:3001/api/signup', data)
    .then(handleErrors)
    .then(response => {
      const jwt = response.headers.get('Authorization');
      localStorage.setItem("token", JSON.stringify(jwt.split(' ')[1]));
      setRedirectHome(true);
      props.setToken(localStorage.getItem('token'));
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="UserForm">
      <h1>Create your account</h1>

      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} autoFocus={true} ></input>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} ></input>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} ></input>
        <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Log in</button>
      </form>

      <Link to="/login">Log in to ConnectU</Link>
      {redirectHome ? <Redirect to="/home" /> : null}
    </div>
  );
}

export default Signup;