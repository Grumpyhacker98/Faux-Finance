import React, { useState, useEffect } from 'react';
import API from './api/axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => {
    console.log(document.cookie)
  });

  const registerUser = () => {
    API.register(registerUsername, registerPassword)
      .then(res => setUser(res.data.name))
  }

  const loginUser = () => {
    API.login(loginUsername, loginPassword)
      .then(res => setUser(res.data.name))
  }

  const getUser = () => {
    API.getUser()
      .then(res => console.log(res))
  }

  const logOut = () => {
    API.logOut()
      .then(setUser(null))
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {user
            ? <span>Welcome {user}</span>
            : <span>Please Log In</span>
          }
        </div>
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
      </header>
    </div>
  );
}

export default App;
