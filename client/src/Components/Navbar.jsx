import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate()
    const handleClick = () => {
        Cookies.remove('token');
        setIsLoggedIn(false)
        navigate('/', { replace: true })
    }
    return (
        <nav>
            <ul>
                <li>
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Home
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <li>
                        <button onClick = {handleClick} >Logout</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <NavLink
                                to="/login"
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) => (isActive ? "active" : "")}
                            >
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
