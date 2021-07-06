import React from 'react';
import Comment from './Comment';

function CommentsContainer(props) {

  function updateLikeCount(comment_id, id) {
    let newCommentsData = [...props.commentsData];
    if (newCommentsData[comment_id].like_id) {
      newCommentsData[comment_id].like_count -= 1;
      newCommentsData[comment_id].like_id = null;
    } else {
      newCommentsData[comment_id].like_count += 1;
      newCommentsData[comment_id].like_id = id;
    }

    props.setCommentsData(newCommentsData);
  };

  function updateCommentCount(comment_id) {
    let newCommentsData = [...props.commentsData];
    newCommentsData[comment_id].comment_count += 1;
    newCommentsData[comment_id].commented = true;
    props.setCommentsData(newCommentsData);
  };

  return (
    <div id="CommentsContainer">
      {props.commentsData ? props.commentsData.map((comment, id) => (
        <Comment key={id} comment={comment} id={id} updateLikeCount={updateLikeCount} updateCommentCount={updateCommentCount}/>
      )) : null}
    </div>
  );
}

export default CommentsContainer;