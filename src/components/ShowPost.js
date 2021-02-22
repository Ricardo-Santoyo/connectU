import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import defaultIcon from '../images/default-user-icon.jpg';
import { ReactComponent as CommentIcon } from '../icons/comment.svg';
import { ReactComponent as RetweetIcon } from '../icons/retweet.svg';
import { ReactComponent as HeartIcon } from '../icons/heart.svg';
import { ReactComponent as ArrowIcon } from '../icons/arrow.svg';

function ShowPost(props) {
  const [post, setPost] = useState();
  const history = useHistory();

  useEffect(() => {
    const p = props.postsData.find((post) => post.id === Number(props.match.params.postID));
    setPost(p);
  }, [props.postsData, props.match.params.postID]);

  return (
    <div className="Container">
      <div className="header">
        <ArrowIcon className="BackArrow" onClick={() => history.goBack()} />
        <h1 className="CenterTitle">Post</h1>
        <div id="Temp"></div>
      </div>
      <div id="ShowPost">
        <div className="PostUser">
          <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
          <div>
            <h2>{post ? post.user_name : ''}</h2>
          </div>
        </div>
        <p>{post ? post.body : ''}</p>
        <div className="ShowPostOptions">
            <CommentIcon />
            <RetweetIcon />
            <HeartIcon />
        </div>
      </div>
    </div>
  );
}

export default ShowPost;