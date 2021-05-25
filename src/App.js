import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthenticationRoute from './components/AuthenticationRoute';
import LogoLoading from './components/LogoLoading';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowPost from './components/ShowPost';
import ShowComment from './components/ShowComment';
import ShowUser from './components/ShowUser';
import Explore from './components/Explore';
import apiCall from './apiCalls/apiCall';
import jwt_decode from "jwt-decode";

function App() {
  const [loading, setLoading] = useState(true);
  const [redirectLocation, setRedirectLocation] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [postsData, setPostsData] = useState();
  const [showMenu, setShowMenu] = useState(false);

  function getUserID(token) {
    const decode = jwt_decode(token);
    setUserID(decode.sub);
    return decode.sub;
  };

  function notAuthorized() {
    localStorage.removeItem("token");
    setToken(null);
    setUserID(null);
    setIsAuthenticated(false);
    setLoading(false);
  };

  function authorized() {
    setIsAuthenticated(true);
    setLoading(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      const ID = getUserID(localToken);
      apiCall(`http://localhost:3001/api/users/${ID}`, 'GET')
      .then(response => response.error ? notAuthorized() : authorized())
    } else {
      setLoading(false);
    }
  }, [])

  return (
    <BrowserRouter>
    {loading ? <LogoLoading /> : null}
    <div id={isAuthenticated ? 'Main' : null} >
      {isAuthenticated ? 
        <Navbar 
          showMenu={showMenu}
          setShowMenu={setShowMenu}
          setToken={setToken}
          setUserID={setUserID}
          setPostsData={setPostsData}
          setIsAuthenticated={setIsAuthenticated}
        /> 
      : null}
      <Switch>
        <AuthenticationRoute isAuthenticated={isAuthenticated} exact path="/" component={Welcome} redirectLocation={redirectLocation}/>

        <AuthenticationRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/login" 
          component={Login}
          setToken={setToken}
          getUserID={getUserID}
          setIsAuthenticated={setIsAuthenticated}
          redirectLocation={redirectLocation}
        />

        <AuthenticationRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/signup" 
          component={Signup}
          setToken={setToken}
          getUserID={getUserID}
          setIsAuthenticated={setIsAuthenticated}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/home" 
          component={Home} 
          token={token} 
          userID={userID} 
          setUserID={setUserID} 
          postsData={postsData} 
          setPostsData={setPostsData} 
          setShowMenu={setShowMenu}
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/profile" 
          component={ShowUser}
          userID={userID}
          currentUserID={userID} 
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          path="/explore" 
          component={Explore}
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/:userHandle/post/:postID" 
          component={ShowPost}
          postsData={postsData}
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/:userHandle/comment/:commentID" 
          component={ShowComment}
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          path="/:userHandle" 
          component={ShowUser}
          postsData={postsData} 
          setPostsData={setPostsData} 
          currentUserID={userID} 
          setRedirectLocation={setRedirectLocation}
          redirectLocation={redirectLocation}
        />

      </Switch>
      {isAuthenticated ? <div id='Temp' /> : null}
    </div>
    </BrowserRouter>
  );
}

export default App;
