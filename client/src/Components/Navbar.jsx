import React from 'react'
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
        <ul>
            <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                    Login
                </NavLink>
            </li>
            <li>
                <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                    Signup
                </NavLink>
            </li>
                {
                Cookies.get('token')
                ?
                <li>
                    <NavLink>
                        Logout
                    </NavLink>
                </li>
                :
                null
                }
        </ul>
    </nav>
  )
}
