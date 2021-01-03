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
  const [username, setUsername] = useState(null);
  const [netWorth, setNetWorth] = useState(null);
  const [stocks, setStocks] = useState(null);



  useEffect(() => {
    // needs improvement
    if (username === null) {
      API.getUser().then(res => {
        if (res.data) setUser(res.data);
        else setUser(false)
      })
    }
  });

  const setUser = (user) => {
    setUsername(user.username);
    setNetWorth(user.worth);
    setStocks(user.stockData)
  }

  const unsetUser = () => {
    setUsername(null);
    setNetWorth(null);
    setStocks(null)
  }

  //    login/logout/searchUser functions
  const getUser = () => {
    API.getUser()
      .then(res => console.log(res))
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
      .then(unsetUser())
  }

  const test = () => {

  }

  return (
    <div className="App">
      <header className="App-header">

        <Router>
          <div>

            <Navbar
              username={username}
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


            {/* <nav className="navbar navbar-light">
              <Link id="brand" to={"/"}>FauxFinance</Link>

              <ul className="nav">
                <li className="nav-item active">
                  <Link className="nav-link btn py-0" to={"/articles"}>Articles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn  py-0" to={"/market"}>Market</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn  py-0" to={"/login"}>Log In</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link btn  py-0" onClick={e => this.userLogout(e)}>Log out</a>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn py-0" to={"/register"}>Register</Link>
                </li>
              </ul>
            </nav> */}

            <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/news' component={News} />
              <Route exact path='/market' render={Market} />
              {/* <Route exact path='/profile' component={Profile} /> */}
            </div>
          </div>
        </Router>

      </header>
    </div>
  );
}