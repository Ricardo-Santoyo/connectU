import React from 'react';
import PostInfo from './PostInfo';
//import apiCall from '../apiCalls/apiCall';

function Comment(props) {

  return (
    <PostInfo data={props.comment} type="comment" />
  );
}

export default Comment;