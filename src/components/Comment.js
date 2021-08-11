import React, { useState } from 'react';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import SuccessMessage from './SuccessMessage';

function Comment(props) {
  const [callingApi, setCallingApi] = useState(false);
  const [message, setMessage] = useState(null);

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

  function bookmarkCall() {
    interactionOptionCall('bookmark', props.comment.bookmark_id, props.updateBookmark, 'comment', props.comment.id, props.id)
    .then(() => {
      if (props.comment.bookmark_id) {
        setMessage("Added to Bookmarks");
      } else {
        setMessage("Removed from Bookmarks");
      }
    });
  };

  return (
    <div className="Border">
      {props.comment.repost_user_name ? <RepostUser data={props.comment}/> : null}
      <PostInfo data={props.comment} type="comment" likeCall={initiateLikeCall} repostCall={repostCall} bookmarkCall={bookmarkCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}}/>
      {message ? <SuccessMessage message={message} setMessage={setMessage} /> : null}
    </div>
  );
}

export default Comment;