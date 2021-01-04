import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import API from './api/axios';
import './App.css';

import Navbar from './components/navbar';
import Home from './components/home';
import News from './components/news';
import Market from './components/market';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';

export default function App() {
  const [user, setUser] = useState(null);

  // look for user on startup
  useEffect(() => {
    // needs improvement
    if (user === null) {
      API.getUser().then(res => {
        if (res.data) setUser(res.data)
        else setUser(false)
      })
    }
  });

  const registerUser = (username, password) => {
    API.register(username, password)
      .then(res => setUser(res.data))
  }

  const loginUser = (username, password) => {
    API.login(username, password)
      .then(res => setUser(res.data))
  }

  const logoutUser = () => {
    API.logOut().then(setUser(false))
  }

  const test = () => {

  }

  return (
    <div className="App">
      <Router>

        <Navbar
          user={user}
          logout={logoutUser}
        />

        {user && <span>Hello {user.username}</span>}

        {/* <button onClick={() => test()}>Test-Click</button> */}

        {/* components when props not needed */}
        <div>
          <Route exact path='/' component={Home} />
          <Route exact path='/news' component={News} />
          <Route exact path='/market' component={Market} />
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/register' render={() => <Register registerUser={registerUser} />} />
          <Route exact path='/login' render={() => <Login loginUser={loginUser} />} />
        </div>
      </Router>
    </div >
  );
}