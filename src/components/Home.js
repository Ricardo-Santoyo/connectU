import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import handleErrors from '../apiCalls/handleErrors';
import PostsContainer from './PostsContainer';

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
    })
    .catch(error => console.log(error));
  };

  useEffect(() => {
    if (!props.postsData) {
      fetch(`http://localhost:3001/api/users/${props.userID}/posts`, {
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
      <PostsContainer postsData={props.postsData} />
      <button id="LogOut" className="colorButton" onClick={logOut}>Log out</button>
      {redirectToWelcome ? <Redirect to="/" /> : null}
    </div>
  );
}

export default Home;