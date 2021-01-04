import React, { useState } from 'react';
import '../App.css';

export default function Login({ loginUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <img id="coin-pile" />
            <span>Login</span>
            <div>
                <input onChange={e => setUsername(e.target.value)} />
                <input onChange={e => setPassword(e.target.value)} />
                <button onClick={() => loginUser(username, password)}>Send</button>
            </div>
        </div>
    )
}