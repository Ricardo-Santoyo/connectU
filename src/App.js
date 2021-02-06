import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState();

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {!token ? <Route exact path="/login" render={(props) => <Login {...props} setToken={setToken}/>} /> : null}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
