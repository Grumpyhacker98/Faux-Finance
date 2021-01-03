import React, { useState, useEffect } from 'react';
import API from './api/axios';
import './App.css';

function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);


  useEffect(() => {
    // needs improvement
    if (user.username === null) {
      API.getUser().then(res => {
        if (res.data) setUser(res.data.username);
        else setUser(false)
      })
    }
  });

  const registerUser = () => {
    API.register(registerUsername, registerPassword)
      .then(res => setUser(res.data.username))
  }

  const loginUser = () => {
    API.login(loginUsername, loginPassword)
      .then(res => setUser(res.data.username))
  }

  const getUser = () => {
    API.getUser()
      .then(res => console.log(res))
  }

  const logOut = () => {
    API.logOut()
      .then(res => {
        console.log(res)
        setUser(null)
      })
  }

  const test = () => {

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
        <div>
          <button onClick={() => test()}>Test</button>
        </div>
      </header>
    </div>
  );
}

export default App;
