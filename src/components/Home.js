import React, { useEffect } from 'react';
import getHomeFeed from '../apiCalls/getHomeFeed';
import NewPost from './NewPost';
import Loading from './Loading';
import PostsContainer from './PostsContainer';
import { ReactComponent as MenuIcon } from '../icons/bars.svg';

function Home(props) {

  useEffect(() => {
    if (!props.postsData) {
      getHomeFeed(props.userID)
      .then(data => props.setPostsData(data))
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
      {!props.postsData ? <Loading /> : <PostsContainer postsData={props.postsData} setPostsData={props.setPostsData}/>}
    </div>
  );
}

export default Home;