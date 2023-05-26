import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";

function App() {

  // Se crea un estado para saber si el usuario está logged
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // cuando se recargue la pagina, para saber si el usuario está logged 
  useEffect(() => {
    if (Cookies.get("token")) {
      setIsLoggedIn(true)
    }
  }, []);
  

  const changeLoggedIn = (value) => {
    setIsLoggedIn(value);
  };

  return (

    <BrowserRouter>
      <Navbar isLoggedIn = {isLoggedIn} setIsLoggedIn = {changeLoggedIn}/>
      <Routes>
        <Route path="/" element={<h1>Welcome to Calendar Manager for volunter Work</h1>} />
        <Route path="/login" element={<Login setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard setIsLoggedIn = {changeLoggedIn}/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;