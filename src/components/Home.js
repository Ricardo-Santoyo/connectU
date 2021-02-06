import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div id="Home">
      <h1>Welcome to ConnectU!</h1>
      <Link to="/signup">
        <button id="homeSignup">Sign up</button>
      </Link>

      <Link to="/login">
      <button id="homeLogin">Log in</button>
      </Link>
    </div>
  );
}

export default Home;