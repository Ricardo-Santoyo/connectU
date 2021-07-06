import React, { useState } from 'react';
import PostInfo from './PostInfo';
import apiCall from '../apiCalls/apiCall';

function Comment(props) {
  const [callingApi, setCallingApi] = useState(false);

  function likeCall() {
    if (!callingApi) {
      if (props.comment.like_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes/${props.comment.like_id}`, 'DELETE')
        .then(response => response.error ? null : props.updateLikeCount(props.id))
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes?type=comment&likeable_id=${props.comment.id}`, 'POST')
        .then(response => response.error ? null : props.updateLikeCount(props.id, response.data.id))
        .then(() => setCallingApi(false))
      }
    }
  };

  return (
    <PostInfo data={props.comment} type="comment" likeCall={likeCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}}/>
  );
}

export default Comment;