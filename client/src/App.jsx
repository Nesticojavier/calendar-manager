import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/signup";
import Login from "./Components/login";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";

function App() {

  // A state is created to know if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("token"))

  // when the page is reloaded, to know if the user is logged in
  // useEffect(() => {
  //   if (Cookies.get("token")) {
  //     setIsLoggedIn(true)
  //   }
  // }, []);


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
