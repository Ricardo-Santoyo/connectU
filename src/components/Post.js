import React from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';

function Post(props) {
  return (
    <div id="Post">
      <Link to={`/users/${props.post.user_id}`}>
        <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
      </Link>
      <div className="PostContent">
        <Link to={`/users/${props.post.user_id}/post/${props.id}`}>
          <h2>{props.post.user_name}</h2>
          <p>{props.post.body}</p>
        </Link>
        <div className="PostOptions">
            <CommentIcon />
            <RetweetIcon />
            <HeartIcon />
        </div>
      </div>
    </div>
  );
}

export default Post;