import React from 'react';
import timeDifference from '../helperFunctions/timeDifference';
import CreatorInfo from './CreatorInfo';
import PostOptions from './PostOptions';

function DetailedPostInfo(props) {

  return (
    <div id="ShowPost">
      <CreatorInfo data={props.data} />
      <p>{props.data.body}</p>
      <span className="PostCreatedAt">{timeDifference(props.data.created_at, true)}</span>
      <PostOptions data={props.data} likeCall={props.likeCall} bookmarkCall={props.bookmarkCall} updateCommentInfo={props.updateCommentInfo}/>
    </div>
  );
}

export default DetailedPostInfo;