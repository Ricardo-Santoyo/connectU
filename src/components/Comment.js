import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
//import apiCall from '../apiCalls/apiCall';
import CreatorLink from './CreatorLink';
import InteractionOptions from './InteractionOptions';

function Comment(props) {
  const newTo = { 
    pathname: `/${props.comment.user_handle}/comment/${props.comment.id}`, 
    comment: props.comment
  };

  return (
    <div id="Post">

      <Link to={`/${props.comment.user_handle}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
      </Link>

      <div className="PostContent">
        <CreatorLink data={props.comment}/>

        <Link to={newTo}>
          <p>{props.comment.body}</p>
        </Link>

        <InteractionOptions data={props.comment} />
      </div>
    </div>
  );
}

export default Comment;