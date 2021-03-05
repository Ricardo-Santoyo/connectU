import React from 'react';
import Post from './Post';

function PostsContainer(props) {

  function updateLikeCount(id) {
    let newPostsData = [...props.postsData];
    if (newPostsData[id].liked) {
      newPostsData[id].like_count -= 1;
      newPostsData[id].liked = false;
    } else {
      newPostsData[id].like_count += 1;
      newPostsData[id].liked = true;
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