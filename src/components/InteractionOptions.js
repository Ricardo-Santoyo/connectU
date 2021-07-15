import React, { useState } from 'react';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as SolidCommentIcon } from '../icons/comment-solid.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';
import NewComment from './NewComment';

function InteractionOptions(props) {
  const [displayNewComment, setDisplayNewComment] = useState(false);

  return (
    <div className="InteractionOptions">
      <div className="IconWithCount HoverBlue" onClick={() => setDisplayNewComment(true)}>
        {props.data.commented ? <SolidCommentIcon className="Blue" /> : <CommentIcon />}
        <span>{props.data.comment_count}</span>
      </div>

      <div className="IconWithCount HoverGreen">
        <RetweetIcon className="RetweetIcon"/>
        <span>{props.data.repost_count}</span>
      </div>

      <div className="IconWithCount HoverRed" onClick={() => props.likeCall()}>
        {props.data.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon />}
        <span>{props.data.like_count}</span>
      </div>

      {displayNewComment ? <NewComment setDisplayNewComment={setDisplayNewComment} updateCommentInfo={props.updateCommentInfo} post={props.data}/> : null}
    </div>
  );
}

export default InteractionOptions;