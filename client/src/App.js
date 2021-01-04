import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import API from './api/axios';
import './App.css';

import Navbar from './components/navbar';
import Home from './components/home';
import News from './components/news';
import Market from './components/market';

export default function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // needs improvement
    if (user === null) {
      API.getUser().then(res => {
        if (res.data) setUser(res.data);
        else setUser(false)
      })
    }
  });

  //    login/logout/searchUser functions
  const getUser = () => {
    API.getUser()
      .then(res => setUser(res.data))
  }

  const registerUser = () => {
    API.register(registerUsername, registerPassword)
      .then(res => setUser(res.data))
  }

  const loginUser = () => {
    API.login(loginUsername, loginPassword)
      .then(res => setUser(res.data))
  }

  const logOut = () => {
    API.logOut()
      .then(setUser(false))
  }

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <div>

            <Navbar
              user={user}
            />

            <div>
              <input onChange={e => setRegisterUsername(e.target.value)} />
              <input onChange={e => setRegisterPassword(e.target.value)} />
              <button onClick={() => registerUser()}>Click</button>
            </div>
            <div>
              <input onChange={e => setLoginUsername(e.target.value)} />
              <input onChange={e => setLoginPassword(e.target.value)} />
              <button onClick={() => loginUser()}>Click</button>
            </div>
            <div>
              <button onClick={() => getUser()}>Click</button>
            </div>
            <div>
              <button onClick={() => logOut()}>Logout</button>
            </div>
            <div>
              <button onClick={() => test()}>Test</button>
            </div>

            <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/news' component={News} />
              <Route exact path='/market' component={Market} />
              {/* <Route exact path='/profile' component={Profile} /> */}
            </div>
          </div>
        </Router>

      </header>
    </div>
  );
}