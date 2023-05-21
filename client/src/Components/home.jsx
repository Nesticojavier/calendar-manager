import React, { useState, useEffect } from "react";
import "./home.css";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState("");
  const navigate = useNavigate()

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };

    axios.get("http://localhost:3000/dashboard", { headers })
      .then((response) => {
        // Manejar la respuesta exitosa de la solicitud
        console.log(response.data);
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
      <button onClick = {handleClick}>Logout</button>
    </div>
  );
}