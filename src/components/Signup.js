import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Signup(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidForm, setInvalidForm] = useState(true);

  useEffect(() => {
    if (/^[a-zA-Z]/.test(name) && /\S@\S/.test(email) && password.length >= 6) {
      setInvalidForm(false);
    } else {
      setInvalidForm(true);
    }
  }, [name, email, password]);

  return (
    <div className="UserForm">
      <h1>Create your account</h1>

      <form>
        <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} autoFocus={true}></input>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
        <button className={invalidForm ? "invalidForm": "colorButton"} type="submit">Log in</button>
      </form>

      <Link to="/login">Log in to ConnectU</Link>
    </div>
  );
}

export default Signup;