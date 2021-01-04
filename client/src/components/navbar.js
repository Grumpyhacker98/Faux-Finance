import React from 'react';
import NavLink from './navlink';

export default function Navbar({ user, logout }) {

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-dark">
            <ul className="nav">
                <NavLink to={"/"} name={"FauxFinance"} />
                <NavLink to={"/news"} name={"News"} />
                <NavLink to={"/market"} name={"Market"} />
                {user
                    ? <>
                        <NavLink to={"/profile"} name={"Profile"} />
                        <NavLink to={"/"} name={"Logout"} onClick={logout} />
                    </>
                    : <>
                        <NavLink to={"/register"} name={"Register"} />
                        <NavLink to={"/login"} name={"Login"} />
                    </>
                }
            </ul>
        </nav >
    )
}