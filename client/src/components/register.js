import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export default function Register({ registerUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div id="color-smear" className="p-5">
            <form className="card p-3 m-5">
                <h5 className="card-title">Register</h5>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" className="form-control" placeholder="Enter username"
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Password"
                        onChange={e => setPassword(e.target.value)} />
                    <small className="form-text text-muted">We encrypt passwords.</small>
                </div>
                <Link className="btn btn-primary mt-3" to={"/"} onClick={() => registerUser(username, password)}>Submit</Link>
            </form>
        </div>
    )
}