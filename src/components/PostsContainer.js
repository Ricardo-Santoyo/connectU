import React from 'react';
import Post from './Post';

function PostsContainer(props) {

  function updateLikeCount(post_id, id) {
    let newPostsData = [...props.postsData];
    if (newPostsData[post_id].like_id) {
      newPostsData[post_id].like_count -= 1;
      newPostsData[post_id].like_id = null;
    } else {
      newPostsData[post_id].like_count += 1;
      newPostsData[post_id].like_id = id;
    }
    props.setPostsData(newPostsData);
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