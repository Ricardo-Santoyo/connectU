import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
import apiCall from '../apiCalls/apiCall';

function User(props) {
  const [callingApi, setCallingApi] = useState(false);

  function follow() {
    if (!callingApi) {
      if (props.user.follower_followee_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/following/${props.user.follower_followee_id}`, 'DELETE')
        .then(response => response.error ? null : props.updateFollowingStatus(props.id))
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/following?person_id=${props.user.id}`, 'POST')
        .then(response => response.error ? null : props.updateFollowingStatus(props.id, response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  }

  return (
    <div id="User">
      <Link to={`/${props.user.handle}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
        <div>
          <h2>{props.user.name}</h2>
          <span className="UserHandle">@{props.user.handle}</span>
        </div>
      </Link>
      <button 
        className={props.user.follower_followee_id ? "colorButton" : "transparentButton"} 
        onClick={() => follow()}>
        {props.user.follower_followee_id ? "Following" : "Follow"}
      </button>
    </div>
  );
}

export default User;