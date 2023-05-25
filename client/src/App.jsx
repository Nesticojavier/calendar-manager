import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/Navbar";

function App() {
  // Se crea un estado para saber qué formulario se está mostrando
  const [currentForm, setCurrentForm] = useState("login");

  // Se usa para cambiar el estado de currentForm al formulario contrario
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<h1>Welcome to Calendar Manager for volunter Work</h1>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;


//const [users, setUsers] = useState([]);

//useEffect(() => {
//  fetch("http://localhost:3000/api2")
//    .then((res) => res.json())
//    .then((data) => setUsers(data))
//    .catch((error) => console.error(error));
//}, []);

//return (
//  <>
//  <UsersList users={users}/>
//  </>
//);
