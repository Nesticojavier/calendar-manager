import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from '@mui/material'


export default function Home() {
    const [rol, setRol] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');

        if (token) {
            const headers = { Authorization: `Bearer ${token}` };
            axios
                .get('http://localhost:3000/dashboard', { headers })
                .then((response) => {
                    setRol(response.data.profile.rol);
                    console.log(rol);
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
    }, [rol, isLoading, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <h1>Bienvenido al Calendar Manager para trabajo voluntario</h1>
            <div style={{ display: 'flex', marginTop: '80px', marginLeft: '10px' }} >
                <Button
                    type="button"
                    variant="contained" color="secondary"
                    onClick={() => navigate("/signup")}
                >
                    Registrarse
                </Button>
                <Button
                    type="button"
                    variant="contained" color="primary"
                    onClick={() => navigate("/login")}
                >
                    Acceder
                </Button>

            </div>
            <div>
                <Link to="/adminlogin">¿Eres administrador?</Link>
            </div>
        </div>
    );
}
