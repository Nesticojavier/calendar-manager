import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./navbar.css";


// export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
export default function Navbar() {
    const { isLoggedIn, changeLoggedIn, changeProfile } = useContext(UserContext)

    const navigate = useNavigate()
    const handleClick = () => {
        Cookies.remove('token');
        changeLoggedIn(false)
        changeProfile(null)
        navigate('/', { replace: true })
    }
    return (
        <nav className="navbar">
            <ul>
                <li className="home">
                    <NavLink
                        to="/"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Inicio
                    </NavLink>
                </li>
                {isLoggedIn ? (
                    <li className="logout">
                        <button
                            className="logout-button"
                            onClick = {handleClick} >
                                Cerrar sesión
                        </button>
                    </li>
                ) : (
                    <>
                        <div style={{ marginLeft: 'auto', display: 'flex' }}>
                            <li className="login">
                                <NavLink
                                    to="/login"
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    Iniciar sesión
                                </NavLink>
                            </li>
                            <li className="signup">
                                <NavLink
                                    to="/signup"
                                    className={({ isActive }) => (isActive ? "active" : "")}
                                >
                                    Registrarse
                                </NavLink>
                            </li>
                        </div>
                    </>
                )}
            </ul>
        </nav>
    );

}
