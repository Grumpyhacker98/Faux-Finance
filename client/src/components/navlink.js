import React from 'react';
import { Link } from 'react-router-dom';

export default function NavLink({ to, onClick, name }) {

    return (
        <li className="nav-item active">
            {onClick
                ? <Link className="nav-link btn" to={to} onClick={onClick}>{name}</Link>
                : <Link className="nav-link btn" to={to}>{name}</Link>
            }
        </li>
    )
}