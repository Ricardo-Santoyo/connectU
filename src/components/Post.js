import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as SolidHeartIcon } from '../icons/heart-solid.svg';
import timeDifference from '../helperFunctions/timeDifference';
import apiCall from '../apiCalls/apiCall';

function Post(props) {
  const [callingApi, setCallingApi] = useState(false);
  const newTo = { 
    pathname: `/${props.post.user_handle}/post/${props.post.id}`, 
    post: props.post
  };

  function likeCall() {
    if (!callingApi) {
      if (props.post.like_id) {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes/${props.post.like_id}`, 'DELETE')
        .then(response => response.error ? null : props.updateLikeCount(props.id))
        .then(() => setCallingApi(false))
      } else {
        setCallingApi(true);
        apiCall(`http://localhost:3001/api/likes?post_id=${props.post.id}`, 'POST')
        .then(response => response.error ? null : props.updateLikeCount(props.id, response.data.id))
        .then(() => setCallingApi(false))
      }
    }
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

        <Link to={newTo}>
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
              {props.post.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon />}
              <span>{props.post.like_count}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Post;