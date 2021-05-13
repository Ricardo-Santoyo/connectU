import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';

function CreatorIcon(props) {
  return (
    <Link to={`/${props.data.user_handle}`}>
      <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
    </Link>
  );
}

export default CreatorIcon;