import React, { useState, useEffect } from 'react';
import interactionOptionCall from '../apiCalls/interactionOptionCall';
import PostInfo from './PostInfo';
import RepostUser from './RepostUser';
import SuccessMessage from './SuccessMessage';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    return () => {
      setCallingApi(null);
    };
  }, []);

  function initiateLikeCall() {
    if (!callingApi) {
      setCallingApi(true);
      interactionOptionCall('like', props.data.like_id, props.updateLikeCount, props.type, props.data.id, props.id)
      .then(() => setCallingApi(false))
    }
  };

  function repostCall() {
    interactionOptionCall('repost', props.data.repost_id, props.updateRepostCount, props.type, props.data.id, props.id)
  };

  function bookmarkCall() {
    interactionOptionCall('bookmark', props.data.bookmark_id, props.updateBookmark, props.type, props.data.id, props.id)
    .then(() => {
      if (props.data.bookmark_id) {
        setMessage("Added to Bookmarks");
      } else {
        setMessage("Removed from Bookmarks");
      }
    });
  };

  return (
    <div className="Border">
      {props.data.repost_user_name ? <RepostUser data={props.data}/> : null}
      <PostInfo data={props.data} type={props.type} likeCall={initiateLikeCall} repostCall={repostCall} bookmarkCall={bookmarkCall} updateCommentInfo={() => {props.updateCommentCount(props.id)}} />
      {message ? <SuccessMessage message={message} setMessage={setMessage} /> : null}
    </div>
  );
}

export default Post;