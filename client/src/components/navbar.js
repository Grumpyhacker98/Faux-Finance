import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar({ user }) {

    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <Link to={"/"}>FauxFinance</Link>
            <ul className="nav">
                <li className="nav-item active">
                    <Link className="nav-link btn" to={"/news"}>News</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link btn" to={"/market"}>Market</Link>
                </li>
                {user
                    ? <li className="nav-item">
                        <span>Welcome {user.username}</span>
                    </li>
                    : <li className="nav-item">
                        <span>Register</span>
                    </li>
                }
                {user
                    ? <li className="nav-item">
                        <span>logout</span>
                    </li>
                    : <li className="nav-item">
                        <span>login</span>
                    </li>
                }
            </ul>
        </nav>
    )
}