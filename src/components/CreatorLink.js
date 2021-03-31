import React from 'react';
import { Link } from 'react-router-dom';
import timeDifference from '../helperFunctions/timeDifference';

function CreatorLink(props) {
  return (
    <Link to={`/${props.data.user_handle}`}>
    <div id="CreatorLink">
      <h2>{props.data.user_name}</h2>
      <span className="UserHandle">@{props.data.user_handle}</span>
      <span className="spacer">·</span>
      <span>{timeDifference(props.data.created_at)}</span>
    </div>
  </Link>
  );
}

export default CreatorLink;