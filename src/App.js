import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import handleErrors from './apiCalls/handleErrors';
import jwt_decode from "jwt-decode";

function App() {
  const [token, setToken] = useState();
  const [userID, setUserID] = useState();

  useEffect(() => {
    const localToken = localStorage.getItem('token');
    setToken(localToken);
    if (localToken) {
      const decode = jwt_decode(localToken);
      setUserID(decode.sub);
      fetch(`http://localhost:3001/api/users/${decode.sub}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localToken}`
        }
      })
      .then(handleErrors)    
      .then(response => response.json())
      .catch(error => console.log(error))
    }
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {token ? <Redirect to='/home' /> : <Welcome />}
        </Route>
        {!token ? <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken}/>} />: null}
        {!token ? <Route exact path="/signup" render={(props) => <Signup {...props} setToken={setToken}/>} /> : null}
        <Route exact path="/home" >
          {!token ? <Redirect to="/" /> : <Home token={token} setToken={setToken} userID={userID} setUserID={setUserID}/>}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
