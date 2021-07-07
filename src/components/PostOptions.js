import React from 'react';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as SolidCommentIcon } from '../icons/comment-solid.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';

function PostOptions(props) {

  return (
    <div>
      <div className="ShowPostOptions">
        <div className="ShowPostStats">
          <span>{props.data.comment_count}</span>
          <span>Comments</span>
        </div>

        <div className="ShowPostStats">
          <span>0</span>
          <span>Retweets</span>
         </div>

        <div className="ShowPostStats">
          <span>{props.data.like_count}</span>
          <span>Likes</span>
        </div>
      </div>

      <div className="ShowPostOptions">
        {props.data.commented ? <SolidCommentIcon className="Blue" /> : <CommentIcon className="HoverBlue"/>}
        <RetweetIcon className="HoverGreen"/>
        <div className="flexDiv" onClick={() => props.likeCall()}>
          {props.data.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon className="HoverRed"/>}
        </div>
      </div>  
    </div>
  );
}

export default PostOptions;