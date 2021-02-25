import React, { useEffect } from 'react';
import getApiCall from '../apiCalls/getApiCall';
import PostsContainer from './PostsContainer';
import NewPost from './NewPost';
import { ReactComponent as MenuIcon } from '../icons/bars.svg';

function Home(props) {

  useEffect(() => {
    if (!props.postsData) {
      getApiCall(`http://localhost:3001/api/users/${props.userID}/posts?include_followees=true`)
      .then(data => props.setPostsData(data.data))
      .catch(error => error)
    }
  })

  return (
    <div className="Container">
      <div className="header">
        <MenuIcon className="mobileMenu" onClick={() => props.setShowMenu(true)}/>
        <h1>Home</h1>
        <div id="Temp"></div>
      </div>
      <NewPost token={props.token} userID={props.userID} postsData={props.postsData} setPostsData={props.setPostsData}/>
      <PostsContainer postsData={props.postsData} />
    </div>
  );
}

export default Home;