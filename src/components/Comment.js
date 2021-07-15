import React, { useState } from 'react';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';
import likeCall from '../apiCalls/likeCall';

function Comment(props) {
  const [callingApi, setCallingApi] = useState(false);

  function initiateLikeCall() {
    if (!callingApi) {
      setCallingApi(true);
      likeCall(props.comment.like_id, props.updateLikeCount, 'comment', props.comment.id, props.id)
      .then(() => setCallingApi(false))
    }
  };

  return (
    <div className="Border">
      {props.comment.repost_user_name ? <RepostUser data={props.comment}/> : null}
      <PostInfo data={props.comment} type="comment" likeCall={initiateLikeCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}}/>
    </div>
  );
}

export default Comment;