import React, { useState } from 'react';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);

  function initiateLikeCall() {
    if (!callingApi) {
      setCallingApi(true);
      interactionOptionCall('like', props.post.like_id, props.updateLikeCount, 'post', props.post.id, props.id)
      .then(() => setCallingApi(false))
    }
  };

  function repostCall() {
    interactionOptionCall('repost', props.post.repost_id, props.updateRepostCount, 'post', props.post.id, props.id)
  };

  return (
    <div className="Border">
      {props.post.repost_user_name ? <RepostUser data={props.post}/> : null}
      <PostInfo data={props.post} type="post" likeCall={initiateLikeCall} repostCall={repostCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}} />
    </div>
  );
}

export default Post;