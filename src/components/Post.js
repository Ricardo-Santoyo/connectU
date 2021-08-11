import React, { useState } from 'react';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';
import SuccessMessage from './SuccessMessage';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);
  const [message, setMessage] = useState(null);

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

  function bookmarkCall() {
    interactionOptionCall('bookmark', props.post.bookmark_id, props.updateBookmark, 'post', props.post.id, props.id)
    .then(() => {
      if (props.post.bookmark_id) {
        setMessage("Added to Bookmarks");
      } else {
        setMessage("Removed from Bookmarks");
      }
    });
  };

  return (
    <div className="Border">
      {props.post.repost_user_name ? <RepostUser data={props.post}/> : null}
      <PostInfo data={props.post} type="post" likeCall={initiateLikeCall} repostCall={repostCall} bookmarkCall={bookmarkCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}} />
      {message ? <SuccessMessage message={message} setMessage={setMessage} /> : null}
    </div>
  );
}

export default Post;