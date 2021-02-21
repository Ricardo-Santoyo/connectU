import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import handleErrors from '../apiCalls/handleErrors';
import PostsContainer from './PostsContainer';
import NewPost from './NewPost';
import { ReactComponent as MenuIcon } from '../icons/bars.svg';

function Home(props) {
  const [redirectToWelcome, setRedirectToWelcome] = useState();

  function logOut() {
    fetch(`http://localhost:3001/api/logout`, {method: 'DELETE'})
    .then(handleErrors)    
    .then(() => {
      localStorage.removeItem("token")
      setRedirectToWelcome(true);
      props.setToken(null);
      props.setUserID(null);
      props.setIsAuthenticated(false);
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    if (!props.postsData) {
      fetch(`http://localhost:3001/api/users/${props.userID}/posts?include_followees=true`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${props.token}`
        }
      })
      .then(handleErrors)    
      .then(response => response.json())
      .then(data => props.setPostsData(data.data))
      .catch(error => console.log(error))
    }
  })

  return (
    <div id="Home">
      <div className="header">
        <MenuIcon className="mobileMenu" onClick={() => props.setShowMenu(true)}/>
        <h1>Home</h1>
        <div id="Temp"></div>
      </div>
      <NewPost token={props.token} userID={props.userID} postsData={props.postsData} setPostsData={props.setPostsData}/>
      <PostsContainer postsData={props.postsData} />
      <button id="LogOut" className="colorButton" onClick={logOut}>Log out</button>
      {redirectToWelcome ? <Redirect to="/" /> : null}
    </div>
  );
}

export default Home;