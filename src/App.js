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
import ShowUser from './components/ShowUser';
import apiCall from './apiCalls/apiCall';
import jwt_decode from "jwt-decode";

function App() {
  const [loading, setLoading] = useState(true);
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
        <AuthenticationRoute isAuthenticated={isAuthenticated} exact path="/" component={Welcome}/>

        <AuthenticationRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/login" 
          component={Login}
          setToken={setToken}
          getUserID={getUserID}
          setIsAuthenticated={setIsAuthenticated}
        />

        <AuthenticationRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/signup" 
          component={Signup}
          setToken={setToken}
          getUserID={getUserID}
          setIsAuthenticated={setIsAuthenticated}
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
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/profile" 
          component={ShowUser}
          userID={userID}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          exact path="/:userHandle/post/:postID" 
          component={ShowPost}
          postsData={postsData}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          path="/:userHandle" 
          component={ShowUser}
        />

      </Switch>
      {isAuthenticated ? <div id='Temp' /> : null}
    </div>
    </BrowserRouter>
  );
}

export default App;
