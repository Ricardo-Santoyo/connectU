import React from 'react';
import Post from './Post';
import Comment from './Comment';
import fixRepostData from '../helperFunctions/fixRepostData';
import removeRepost from '../helperFunctions/removeRepost';

function PostsContainer(props) {

  function updateLikeCount(post_id, data, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    if (newPostsData[post_id].like_id) {
      newPostsData[post_id].like_count -= 1;
      newPostsData[post_id].like_id = null;
    } else {
      newPostsData[post_id].like_count += 1;
      newPostsData[post_id].like_id = data.data.id;
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateLikeCount(p, data, true);
      }
    }
  };

  function updateCommentCount(post_id, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    newPostsData[post_id].comment_count += 1;
    newPostsData[post_id].commented = true;

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateCommentCount(p, true);
      }
    }
  };

  function updateRepostCount(post_id, data, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    if (newPostsData[post_id].repost_id) {
      post_id = removeRepost(newPostsData, newPostsData[post_id].id);
    } else {
      newPostsData[post_id].repost_count += 1;
      newPostsData[post_id].repost_id = data.repost.id;
      newPostsData = [fixRepostData(data), ...newPostsData];
      post_id += 1;
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateRepostCount(p, data, true);
      }
    }
  }

  return (
    <div id="PostsContainer">
      {props.postsData ? props.postsData.map((post, id) => (
        post.commentable_type ? <Comment key={id} comment={post} id={id} updateLikeCount={updateLikeCount} updateRepostCount={updateRepostCount} updateCommentCount={updateCommentCount}/>
        : <Post key={id} post={post} id={id} updateLikeCount={updateLikeCount} updateRepostCount={updateRepostCount} updateCommentCount={updateCommentCount}/>
      )) : null}
    </div>
  );
}

export default PostsContainer;