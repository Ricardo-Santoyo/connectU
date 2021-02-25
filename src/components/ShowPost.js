import React, { useEffect, useState } from 'react';
import Header from './Header';
import { Link } from 'react-router-dom'
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import timeDifference from '../helperFunctions/timeDifference';

function ShowPost(props) {
  const [post, setPost] = useState();

  useEffect(() => {
    const p = props.postsData.find((post) => post.id === Number(props.match.params.postID));
    setPost(p);
  }, [props.postsData, props.match.params.postID]);

  return (
    <div className="Container">

      <Header title="Post" />
      {post ?
      <div id="ShowPost">

        <div className="PostUser">
          <Link to={`/${post.user_handle}`}>
            <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img> 
            <div>
              <h2>{post.user_name}</h2>
              <span className="UserHandle">@{post.user_handle}</span>
            </div>
          </Link>
        </div>

        <p>{post.body}</p>

        <span className="PostCreatedAt">{timeDifference(post.created_at, true)}</span>

        <div className="ShowPostOptions">
          <div className="ShowPostStats">
            <span>{post.comment_count}</span>
            <span>Comments</span>
          </div>

          <div className="ShowPostStats">
            <span>0</span>
            <span>Retweets</span>
          </div>

          <div className="ShowPostStats">
            <span>{post.like_count}</span>
            <span>Likes</span>
          </div>
        </div>

        <div className="ShowPostOptions">
            <CommentIcon className="HoverBlue"/>
            <RetweetIcon className="HoverGreen"/>
            <HeartIcon className="HoverRed"/>
        </div>
      </div>
      : null}
    </div>
  );
}

export default ShowPost;