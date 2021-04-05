import React from 'react';
import defaultIcon from '../images/default-user-icon.jpg';
import PostForm from './PostForm';
import apiCall from '../apiCalls/apiCall';

function NewPost(props) {

  function handleSubmit(value, e) {
    e.preventDefault();
    const data = {post: {body: value}}
    apiCall(`http://localhost:3001/api/users/${props.userID}/posts`, 'POST', JSON.stringify(data))
    .then(data => props.setPostsData([data.data, ...props.postsData]))
    .catch(error => console.log(error))
  };

  return (
    <div id="NewPost">
      <img src={defaultIcon} alt='User Icon' className="PostUserIcon"></img>
      <PostForm handleSubmit={handleSubmit} placeholder="What's happening?"/>
    </div>
  );
}

export default NewPost;