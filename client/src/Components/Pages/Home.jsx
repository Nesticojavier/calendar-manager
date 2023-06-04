import React from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Home() {

    if (Cookies.get('token')) {
        return <Navigate to={"/dashboard"} replace />;
    }
    return (
        <div className='App'>
            <h1>Bienvenido al Calendar Manager para trabajo voluntario</h1>
        </div>
    )
}
