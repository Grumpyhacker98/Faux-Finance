import React, { useState } from 'react';

export default function Register({ registerUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <span>Register</span>
            <div>
                <input onChange={e => setUsername(e.target.value)} />
                <input onChange={e => setPassword(e.target.value)} />
                <button onClick={() => registerUser(username, password)}>Send</button>
            </div>
        </div>
    )
}