import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';

function User(props) {

  return (
    <div id="User">
      <Link to={`/${props.user.handle}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
        <div>
          <h2>{props.user.name}</h2>
          <span className="UserHandle">@{props.user.handle}</span>
        </div>
      </Link>
      <button className="transparentButton">Follow</button>
    </div>
  );
}

export default User;