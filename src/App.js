import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Welcome} />
        {!token ? <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken}/>} /> : null}
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
