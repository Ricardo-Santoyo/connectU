import React from 'react';

function NewComment(props) {

  return (
    <div id="NewComment">
      <h1 onClick={() => props.setDisplayNewComment(false)}>OK</h1>
    </div>
  );
}

export default NewComment;