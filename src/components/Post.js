import React, { useState } from 'react';
import apiCall from '../apiCalls/apiCall';
import PostInfo from './PostInfo';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);

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
    <PostInfo data={props.post} type="post" likeCall={likeCall} updateCommentInfo={updateCommentInfo} />
  );
}

export default Post;