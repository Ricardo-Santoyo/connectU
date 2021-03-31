import React from 'react';

function Comment(props) {

  return (
    <div id="Comment">
      {props.comment.body}
    </div>
  );
}

export default Comment;