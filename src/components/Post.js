import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreatorIcon from './CreatorIcon';
import apiCall from '../apiCalls/apiCall';
import CreatorLink from './CreatorLink';
import InteractionOptions from './InteractionOptions';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);
  const newTo = { 
    pathname: `/${props.post.user_handle}/post/${props.post.id}`, 
    post: props.post
  };

  function likeCall() {
    if (!callingApi) {
      if (props.post.like_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes/${props.post.like_id}`, 'DELETE')
        .then(response => response.error ? null : props.updateLikeCount(props.id))
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes?type=post&likeable_id=${props.post.id}`, 'POST')
        .then(response => response.error ? null : props.updateLikeCount(props.id, response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  };

  function updateCommentInfo() {
    props.updateCommentCount(props.id);
  };

  return (
    <div id="Post">

      <CreatorIcon data={props.post} />

      <div className="PostContent">
        <CreatorLink data={props.post}/>

        <Link to={newTo}>
          <p>{props.post.body}</p>
        </Link>

        <InteractionOptions data={props.post} likeCall={likeCall} updateCommentInfo={updateCommentInfo}/>
      </div>
    </div>
  );
}

export default Post;