import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Pages/signup";
import Login from "./Components/Pages/login";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";
import Home from "./Components/Pages/Home";

import Provider from "./Components/Pages/Provider";
import WorkCreationForm from "./Components/WorkCreationForm"
import Calendar from "./Components/Calendar"
import WorkListProvider from "./Components/WorkListProvider"
import WorkEditForm from "./Components/WorkEditForm"

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
        
        <Route path="/" element={<Home setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/login" element={<Login setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/signup" element={<Signup/>} />

        <Route path="/provider/*" element={<Provider/>}>
          <Route path="workcreation" element={<WorkCreationForm />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="worklist" element={<WorkListProvider />} />
          <Route path="workedit/:id" element={<WorkEditForm />} />
        </Route>

        {/* <Route path="/volunter/*" element={<Volunter/>}>
          <Route path="myworks" element={<WorkListVolunter />} />
          <Route path="myperfil" element={<ProfileVolunter />} />
          <Route path="editprofile/:id" element={<EditVolunterProfile />} />
          <Route path="workview/:id" element={<WorkView />} />
          <Route path="calendar" element={<Calendar />} />
        </Route> */}







        {/* <Route path="/dashboard" element={<Dashboard setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/WorkCreation" element={<WorkCreation setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/WorkList" element={<WorkList setIsLoggedIn = {changeLoggedIn}/>} />
        <Route path="/WorkEdit/:id" element={<WorkEdit setIsLoggedIn = {changeLoggedIn}/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
