import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from '@mui/material'
import { UserContext } from "../../Context/UserContext";

export default function Home() {
    const [rol, setRol] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const { isLoggedIn, changeProfile } = useContext(UserContext)

    useEffect(() => {
        const api_url = import.meta.env.VITE_API_URL;
        const token = Cookies.get('token');

        if (isLoggedIn) {
            const headers = { Authorization: `Bearer ${token}` };
            axios
                .get(`${api_url}/dashboard`, { headers })
                .then((response) => {
                    setRol(response.data.profile.rol);
                    changeProfile(response.data.profile)
                })
                .catch((error) => {
                    console.error(error.response.data.message);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!isLoading) {
            if (rol === 'proveedor') {
                navigate('/provider/calendar', { replace: true });
            } else if (rol === 'voluntario') {
                navigate('/volunter/calendar', { replace: true });
            }
        }
    }, [rol, isLoading, navigate, isLoggedIn]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="homepage">
            <div className='hometitle'>
                <h1>Bienvenido al Calendar Manager para trabajo voluntario</h1>
            </div>
            {/* <div className='buttonshome'>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => navigate("/signup")}
                >
                    Registrarse
                </Button>
                <Button
                    type="button"
                    variant="contained"
                    onClick={() => navigate("/login")}
                >
                    Acceder
                </Button>

            </div> */}
            {/* <div className='homelink'>
                <Link to="/adminlogin">¿Eres administrador?</Link>
            </div> */}
        </div>
    );
}
