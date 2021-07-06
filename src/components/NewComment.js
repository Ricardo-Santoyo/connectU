import React from 'react';
import PostForm from './PostForm';
import apiCall from '../apiCalls/apiCall';

function NewComment(props) {

  function handleSubmit(value, e) {
    const type = props.post.commentable_type ? "Comment" : "Post";
    e.preventDefault();
    const data = {comment: {body: value, commentable_type: type, commentable_id: props.post.id}}
    apiCall(`http://localhost:3001/api/comments`, 'POST', JSON.stringify(data))
    props.updateCommentInfo();
    props.setDisplayNewComment(false);
  };

  return (
    <div id="NewCommentContainer" onClick={() => props.setDisplayNewComment(false)}>
      <div id="NewComment" onClick={(e) => e.stopPropagation()}>
        <p onClick={() => props.setDisplayNewComment(false)}>✕</p>
        <PostForm handleSubmit={handleSubmit} placeholder="Comment" autofocus={true}/>
      </div>
    </div>
  );
}

export default NewComment;