import React from 'react';
import { Link } from 'react-router-dom';
//import apiCall from '../apiCalls/apiCall';
import CreatorLink from './CreatorLink';
import CreatorIcon from './CreatorIcon';
import InteractionOptions from './InteractionOptions';

function Comment(props) {
  const newTo = { 
    pathname: `/${props.comment.user_handle}/comment/${props.comment.id}`, 
    comment: props.comment
  };

  return (
    <div id="Post">

      <CreatorIcon data={props.comment} />

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