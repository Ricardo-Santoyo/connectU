import React from 'react';
import Comment from './Comment';

function CommentsContainer(props) {

  return (
    <div id="CommentsContainer">
      {props.commentsData ? props.commentsData.map((comment, id) => (
        <Comment key={id} comment={comment} id={id} />
      )) : null}
    </div>
  );
}

export default CommentsContainer;