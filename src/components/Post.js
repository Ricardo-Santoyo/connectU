import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';
import timeDifference from '../helperFunctions/timeDifference';

function Post(props) {
  const [like, setLike] = useState(false);

  function likeCall() {
    setLike(true);
  };

  return (
    <div id="Post">

      <Link to={`/${props.post.user_handle}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
      </Link>

      <div className="PostContent">

        <Link to={`/${props.post.user_handle}`}>
          <div id="PostUserName">
            <h2>{props.post.user_name}</h2>
            <span className="UserHandle">@{props.post.user_handle}</span>
            <span className="spacer">·</span>
            <span>{timeDifference(props.post.created_at)}</span>
          </div>
        </Link>

        <Link to={`/${props.post.user_handle}/post/${props.post.id}`}>
          <p>{props.post.body}</p>
        </Link>

        <div className="PostOptions">

            <div className="IconWithCount HoverBlue">
              <CommentIcon />
              <span>{props.post.comment_count}</span>
            </div>

            <div className="IconWithCount HoverGreen">
              <RetweetIcon className="RetweetIcon"/>
              <span>0</span>
            </div>

            <div className="IconWithCount HoverRed" onClick={() => likeCall()}>
              {like ? <SolidHeartIcon className="Red" /> : <HeartIcon />}
              <span>{props.post.like_count}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Post;