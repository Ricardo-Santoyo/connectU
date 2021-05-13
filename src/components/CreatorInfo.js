import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';

function CreatorInfo(props) {
  return (
    <div className="PostUser">
      <Link to={`/${props.data.user_handle}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img> 
        <div>
          <h2>{props.data.user_name}</h2>
          <span className="UserHandle">@{props.data.user_handle}</span>
        </div>
      </Link>
    </div>
  );
}

export default CreatorInfo;