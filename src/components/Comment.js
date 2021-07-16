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

  function repostCall() {
    if (props.comment.repost_id) {
      props.updateRepostCount(props.id);
    } else {
      props.updateRepostCount(props.id, 5);
    }
  };

  return (
    <div className="Border">
      {props.comment.repost_user_name ? <RepostUser data={props.comment}/> : null}
      <PostInfo data={props.comment} type="comment" likeCall={initiateLikeCall} repostCall={repostCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}}/>
    </div>
  );
}

export default Comment;