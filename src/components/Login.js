import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);

  useEffect(() => {
    if (/\S@\S/.test(email) && password.length >= 6) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [email, password]);

  return (
    <div id="Login">
      <h1>Log in to ConnectU</h1>

      <form>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} autoFocus={true}></input>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Log in</button>
      </form>

      <Link to="/signup">Sign up for ConnectU</Link>
    </div>
  );
}

export default Login;