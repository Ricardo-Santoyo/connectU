import React from 'react';
import Post from './Post';

function PostsContainer(props) {

  function updateLikeCount(post_id, id, stop) {
    let newPostsData = stop ? [...props.pData] : [...props.postsData];
    if (newPostsData[post_id].like_id) {
      newPostsData[post_id].like_count -= 1;
      newPostsData[post_id].like_id = null;
    } else {
      newPostsData[post_id].like_count += 1;
      newPostsData[post_id].like_id = id;
    }

    if (stop) {
      props.setPData(newPostsData);
    } else {
      props.setPostsData(newPostsData);

      let p = props.pData ? props.pData.findIndex((post) => post.id === newPostsData[post_id].id) : -1;
      if (p !== -1) {
        updateLikeCount(p, id, true);
      }
    }
  };

  return (
    <div id="PostsContainer">
      {props.postsData ? props.postsData.map((post, id) => (
        <Post key={id} post={post} id={id} updateLikeCount={updateLikeCount}/>
      )) : null}
    </div>
  );
}

export default PostsContainer;