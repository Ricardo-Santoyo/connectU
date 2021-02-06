import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
  return (
    <div id="Welcome">
      <h1>Welcome to ConnectU!</h1>
      <Link to="/signup">
        <button className="colorButton">Sign up</button>
      </Link>

      <Link to="/login">
      <button className="transparentButton">Log in</button>
      </Link>
    </div>
  );
}

export default Welcome;