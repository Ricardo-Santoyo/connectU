import React from 'react';
import CreatorLink from './CreatorLink';
import CreatorIcon from './CreatorIcon';
import ShowMoreLink from './ShowMoreLink';
import InteractionOptions from './InteractionOptions';

function PostInfo(props) {

  return (
    <div id="Post">
      <CreatorIcon data={props.data} />

      <div className="PostContent">
        <CreatorLink data={props.data}/>
        <ShowMoreLink data={props.data} type={props.type} />
        <InteractionOptions data={props.data} likeCall={props.likeCall} repostCall={props.repostCall} updateCommentInfo={props.updateCommentInfo} />
      </div>
    </div>
  );
}

export default PostInfo;