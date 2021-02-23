import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ShowPost from './components/ShowPost';
import handleErrors from './apiCalls/handleErrors';
import jwt_decode from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [postsData, setPostsData] = useState();
  const [showMenu, setShowMenu] = useState(false);

  function getUserID(token) {
    const decode = jwt_decode(token);
    setUserID(decode.sub);
    return decode.sub;
  }

  function notAuthorized() {
    localStorage.removeItem("token");
    setToken(null);
    setUserID(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      const ID = getUserID(localToken);
      fetch(`http://localhost:3001/api/users/${ID}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      .then(handleErrors)    
      .then(response => response.json())
      .then(setIsAuthenticated(true))
      .catch(error => notAuthorized())
    }
  }, [])

  return (
    <BrowserRouter>
    <div id={isAuthenticated ? 'Main' : null} >
      {isAuthenticated ? 
        <Navbar 
          showMenu={showMenu} 
          setShowMenu={setShowMenu} 
          setToken={setToken} 
          setUserID={setUserID} 
          setIsAuthenticated={setIsAuthenticated} 
        /> 
      : null}
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to='/home' /> : <Welcome />}
        </Route>
        {!isAuthenticated ? <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken} getUserID={getUserID} setIsAuthenticated={setIsAuthenticated}/>} />: null}
        {!isAuthenticated ? <Route exact path="/signup" render={(props) => <Signup {...props} setToken={setToken} getUserID={getUserID} setIsAuthenticated={setIsAuthenticated}/>} /> : null}

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          path="/home" 
          component={Home} 
          token={token} 
          setToken={setToken} 
          userID={userID} 
          setUserID={setUserID} 
          postsData={postsData} 
          setPostsData={setPostsData} 
          setShowMenu={setShowMenu}
        />

        <PrivateRoute 
          isAuthenticated={isAuthenticated} 
          path="/:userHandle/post/:postID" 
          component={ShowPost}
          postsData={postsData}
        />
      </Switch>
      {isAuthenticated ? <div id='Temp' /> : null}
    </div>
    </BrowserRouter>
  );
}

export default App;
