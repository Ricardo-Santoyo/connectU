import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import handleErrors from './apiCalls/handleErrors';
import jwt_decode from "jwt-decode";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();
  const [postsData, setPostsData] = useState();

  function getUserID(token) {
    const decode = jwt_decode(token);
    setUserID(decode.sub);
    return decode.sub;
  }

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
      .catch(error => console.log(error))
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Redirect to='/home' /> : <Welcome />}
        </Route>
        {!isAuthenticated ? <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken} getUserID={getUserID} setIsAuthenticated={setIsAuthenticated}/>} />: null}
        {!isAuthenticated ? <Route exact path="/signup" render={(props) => <Signup {...props} setToken={setToken} getUserID={getUserID} setIsAuthenticated={setIsAuthenticated}/>} /> : null}

        <PrivateRoute isAuthenticated={isAuthenticated} >
          <Home 
            token={token} 
            setToken={setToken} 
            userID={userID} 
            setUserID={setUserID} 
            setIsAuthenticated={setIsAuthenticated} 
            postsData={postsData} 
            setPostsData={setPostsData} 
          />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
