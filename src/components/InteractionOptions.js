import React from 'react';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';

function InteractionOptions(props) {

  return (
    <div className="InteractionOptions">
      <div className="IconWithCount HoverBlue">
        <CommentIcon />
        <span>{props.data.comment_count}</span>
      </div>

      <div className="IconWithCount HoverGreen">
        <RetweetIcon className="RetweetIcon"/>
        <span>0</span>
      </div>

      <div className="IconWithCount HoverRed" onClick={() => props.likeCall()}>
        {props.data.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon />}
        <span>{props.data.like_count}</span>
      </div>
    </div>
  );
}

export default InteractionOptions;