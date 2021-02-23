import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';

function Post(props) {
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
            </div>

            <div className="IconWithCount HoverRed">
              <HeartIcon />
              <span>{props.post.like_count}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Post;