import React from 'react'
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Home() {

    const token = Cookies.get('token')
    
    if (token) {
        return <Navigate to={"/provider/calendar"} replace />;
    }
    return (
        <div className='App'>
            <h1>Bienvenido al Calendar Manager para trabajo voluntario</h1>
        </div>
    )
}
