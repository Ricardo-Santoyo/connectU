import React, { useState } from 'react';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as SolidCommentIcon } from '../icons/comment-solid.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';
import { ReactComponent as ShareIcon } from '../icons/share-solid.svg';
import NewComment from './NewComment';
import ShareMenu from './ShareMenu';
import SuccessMessage from './SuccessMessage';

function InteractionOptions(props) {
  const [displayNewComment, setDisplayNewComment] = useState(false);
  const [displayShareMenu, setDisplayShareMenu] = useState(false);
  const [message, setMessage] = useState(null);

  function copyLink() {
    navigator.clipboard.writeText(`http://localhost:3000/${props.data.user_handle}/${props.type}/${props.data.user_post_id}`);
    setDisplayShareMenu(false);
    setMessage("Link Copied");
  };

  function bookmark() {
    setDisplayShareMenu(false);
    props.bookmarkCall();
  };

  return (
    <div className="InteractionOptions">
      <div className="IconWithCount HoverBlue" onClick={() => setDisplayNewComment(true)}>
        {props.data.commented ? <SolidCommentIcon className="Blue" /> : <CommentIcon />}
        <span>{props.data.comment_count}</span>
      </div>

      <div className="IconWithCount HoverGreen" onClick={() => props.repostCall()}>
        <RetweetIcon className="RetweetIcon" className={props.data.repost_id ? "Green" : null}/>
        <span>{props.data.repost_count}</span>
      </div>

      <div className="IconWithCount HoverRed" onClick={() => props.likeCall()}>
        {props.data.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon />}
        <span>{props.data.like_count}</span>
      </div>

      <div className="IconWithCount HoverBlue" onClick={() =>  setDisplayShareMenu(true)}>
        <ShareIcon className="share"/>
      </div>

      {displayNewComment ? <NewComment setDisplayNewComment={setDisplayNewComment} updateCommentInfo={props.updateCommentInfo} post={props.data}/> : null}
      {displayShareMenu ? <ShareMenu setDisplayShareMenu={setDisplayShareMenu} copyLink={copyLink} bookmark={bookmark} bookmark_id={props.data.bookmark_id} /> : null}
      {message ? <SuccessMessage message={message} setMessage={setMessage} /> : null}
    </div>
  );
}

export default InteractionOptions;