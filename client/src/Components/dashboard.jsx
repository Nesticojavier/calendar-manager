import React, { useState, useEffect } from "react";
import "./home.css";
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';


export default function Dashboard({ setIsLoggedIn }) {

  const token = Cookies.get('token');
  const headers = { Authorization: `Bearer ${token}` };
  const [user, setUser] = useState("");
  const navigate = useNavigate()

  const handleClick = () => {
    // localStorage.removeItem('token');
    Cookies.remove('token');
    setIsLoggedIn(false)
    navigate('/', { replace: true })
  }

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }

  useEffect(() => {

    axios.get("http://localhost:3000/dashboard", { headers })
      .then((response) => {
        // Manejar la respuesta exitosa de la solicitud
        setUser(response.data);
      })
      .catch((error) => {
        // Manejar el error de la solicitud
        console.error(error.response.data.message);
      });
  }, []); // Dependencia vacía para que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="Home">
      <h1>Welcome to Calendar Manager for Volunteer Work</h1>
      <p>User: {user.username}</p>
      <p>Modo: {user.rol}</p>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}