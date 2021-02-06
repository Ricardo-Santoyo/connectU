import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';

function App() {
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken}/>} />
        <Route exact path="/signup" render={(props) => <Signup {...props} setToken={setToken}/>} />
        <Route exact path="/home" >
          {!token ? <Redirect to="/" /> : <Home />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
