import React from 'react';
import Comment from './Comment';
import fixRepostData from '../helperFunctions/fixRepostData';
import removeRepost from '../helperFunctions/removeRepost';

function CommentsContainer(props) {

  function updateLikeCount(comment_id, data) {
    let newCommentsData = [...props.commentsData];
    if (newCommentsData[comment_id].like_id) {
      newCommentsData[comment_id].like_count -= 1;
      newCommentsData[comment_id].like_id = null;
    } else {
      newCommentsData[comment_id].like_count += 1;
      newCommentsData[comment_id].like_id = data.data.id;
    }

    props.setCommentsData(newCommentsData);
  };

  function updateCommentCount(comment_id) {
    let newCommentsData = [...props.commentsData];
    newCommentsData[comment_id].comment_count += 1;
    newCommentsData[comment_id].commented = true;
    props.setCommentsData(newCommentsData);
  };

  function updateRepostCount(comment_id, data) {
    let newCommentsData = [...props.commentsData];
    if (newCommentsData[comment_id].repost_id) {
      newCommentsData[comment_id].repost_count -= 1;
      newCommentsData[comment_id].repost_id = null;
      if (props.postsData) {
        let newPostsData = [...props.postsData];
        removeRepost(newPostsData, newCommentsData[comment_id].id);
        props.setPostsData(newPostsData);
      };
    } else {
      newCommentsData[comment_id].repost_count += 1;
      newCommentsData[comment_id].repost_id = data.repost.id;
      if (props.postsData) {
        props.setPostsData([fixRepostData(data), ...props.postsData]);
      };
    };

    props.setCommentsData(newCommentsData);
  };

  return (
    <div id="CommentsContainer">
      {props.commentsData ? props.commentsData.map((comment, id) => (
        <Comment key={id} comment={comment} id={id} updateLikeCount={updateLikeCount} updateRepostCount={updateRepostCount} updateCommentCount={updateCommentCount}/>
      )) : null}
    </div>
  );
}

export default CommentsContainer;