import React, { useState } from 'react';
import apiCall from '../apiCalls/apiCall';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';

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

  return (
    <div className="Border">
      {props.post.repost_user_name ? <RepostUser data={props.post}/> : null}
      <PostInfo data={props.post} type="post" likeCall={likeCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}} />
    </div>
  );
}

export default Post;