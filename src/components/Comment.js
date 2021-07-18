import React, { useState } from 'react';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';
import interactionOptionCall from '../apiCalls/interactionOptionCall';

function Comment(props) {
  const [callingApi, setCallingApi] = useState(false);

  function initiateLikeCall() {
    if (!callingApi) {
      setCallingApi(true);
      interactionOptionCall('like', props.comment.like_id, props.updateLikeCount, 'comment', props.comment.id, props.id)
      .then(() => setCallingApi(false))
    }
  };

  function repostCall() {
    interactionOptionCall('repost', props.comment.repost_id, props.updateRepostCount, 'comment', props.comment.id, props.id)
  };

  return (
    <div className="Border">
      {props.comment.repost_user_name ? <RepostUser data={props.comment}/> : null}
      <PostInfo data={props.comment} type="comment" likeCall={initiateLikeCall} repostCall={repostCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}}/>
    </div>
  );
}

export default Comment;