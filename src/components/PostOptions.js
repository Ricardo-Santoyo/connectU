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

function PostOptions(props) {
  const [displayNewComment, setDisplayNewComment] = useState(false);
  const [displayShareMenu, setDisplayShareMenu] = useState(false);
  const [message, setMessage] = useState(null);

  function copyLink() {
    const type = props.data.commentable_type ? 'comment' : 'post'
    navigator.clipboard.writeText(`http://localhost:3000/${props.data.user_handle}/${type}/${props.data.user_post_id}`);
    setDisplayShareMenu(false);
    setMessage("Link Copied");
  };

  function bookmark() {
    setDisplayShareMenu(false);
    props.bookmarkCall();
  };

  return (
    <div>
      <div className="ShowPostOptions flexwrap">
        <div className="ShowPostStats">
          <span>{props.data.comment_count}</span>
          <span>Comments</span>
        </div>

        <div className="ShowPostStats">
          <span>{props.data.repost_count}</span>
          <span>Retweets</span>
         </div>

        <div className="ShowPostStats">
          <span>{props.data.like_count}</span>
          <span>Likes</span>
        </div>
      </div>

      <div className="ShowPostOptions">
        <div className="flexDiv" onClick={() => setDisplayNewComment(true)}>
          {props.data.commented ? <SolidCommentIcon className="Blue" /> : <CommentIcon className="HoverBlue"/>}
        </div>
        <div className="flexDiv" onClick={() => props.repostCall()}>
          <RetweetIcon className="HoverGreen" className={props.data.repost_id ? "Green" : null}/>
        </div>
        <div className="flexDiv" onClick={() => props.likeCall()}>
          {props.data.like_id ? <SolidHeartIcon className="Red" /> : <HeartIcon className="HoverRed"/>}
        </div>
        <div className="flexDiv postOptionsShare">
          <ShareIcon className="HoverBlue" onClick={() =>  setDisplayShareMenu(true)}/>
          {displayShareMenu ? <ShareMenu setDisplayShareMenu={setDisplayShareMenu} copyLink={copyLink} bookmark={bookmark} bookmark_id={props.data.bookmark_id} /> : null}
        </div>
      </div>
      {displayNewComment ? <NewComment setDisplayNewComment={setDisplayNewComment} updateCommentInfo={props.updateCommentInfo} post={props.data} returnData={true}/> : null}
      {message ? <SuccessMessage message={message} setMessage={setMessage} /> : null}
    </div>
  );
}

export default PostOptions;