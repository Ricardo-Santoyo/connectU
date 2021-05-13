import React from 'react';
//import apiCall from '../apiCalls/apiCall';
import CreatorLink from './CreatorLink';
import CreatorIcon from './CreatorIcon';
import ShowMoreLink from './ShowMoreLink';
import InteractionOptions from './InteractionOptions';

function Comment(props) {

  return (
    <div id="Post">

      <CreatorIcon data={props.comment} />

      <div className="PostContent">
        <CreatorLink data={props.comment}/>
        <ShowMoreLink data={props.comment} type="comment" />
        <InteractionOptions data={props.comment} />
      </div>
    </div>
  );
}

export default Comment;