import React, { useState } from 'react';
import '../App.css';

export default function Login({ loginUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div id="coin-pile" className="p-5">
            <form className="card p-3 m-5">
                <h5 class="card-title">Login</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div classname="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                    <small className="form-text text-muted">We encrypt passwords.</small>
                </div>
                <button onClick={() => loginUser(username, password)}
                    type="submit" className="btn btn-primary mt-3">
                    Submit
                </button>
            </form>
        </div>
    )
}