import React from 'react';
import Post from './Post';

function PostsContainer(props) {
  return (
    <div id="PostsContainer">
      {props.postsData ? props.postsData.map((post, id) => (
        <Post key={id} post={post} id={id}/>
      )) : null}
    </div>
  );
}

export default PostsContainer;