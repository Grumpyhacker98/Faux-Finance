import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar(props) {

    return (
        <nav>
            <Link to={"/"}>FauxFinance</Link>

            <ul className="nav">
                <li className="nav-item active">
                    <Link className="nav-link btn" to={"/news"}>News</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link btn" to={"/market"}>Market</Link>
                </li>
                <li className="nav-item">
                    <span>register</span>
                </li>
                {props.username
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