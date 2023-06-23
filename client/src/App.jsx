import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Pages/signup";
import Login from "./Components/Pages/login";
import Navbar from "./Components/Navbar";
import Cookies from "js-cookie";
import Home from "./Components/Pages/Home";
import { UserContext } from "./Context/UserContext";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import Provider from "./Components/Pages/Provider";
import WorkCreationForm from "./Components/ProviderComponents/WorkCreationForm";
import Calendar from "./Components/Calendar";
import WorkListProvider from "./Components/ProviderComponents/WorkListProvider";
import WorkEditForm from "./Components/ProviderComponents/WorkEditForm";
import WorkListInProgress from "./Components/ProviderComponents/WorkListInProgress";

import Volunteer from "./Components/Pages/Volunteer";
import WorkViewVolunteer from "./Components/VolunteerComponents/WorkViewVolunteer";
import WorkListVolunteer from "./Components/VolunteerComponents/WorkListVolunteer";
import ProfileVolunteer from "./Components/VolunteerComponents/ProfileVolunteer";
import EditVolunteerProfile from "./Components/VolunteerComponents/EditVolunteerProfile";
import CalendarVolunteer from "./Components/CalendarVolunteer";

import Admin from "./Components/Pages/Admin";
import AdminLogin from "./Components/Pages/AdminLogin";
import EditUser from "./Components/AdminComponents/EditUser";
import UsersTable from "./Components/AdminComponents/UsersTable";

function App() {


  // Context to know if the user is logged in
  const { isLoggedIn, profile } = useContext(UserContext);
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route path="/" element={<Home/>} />
        {/* Routes manage for user no logged */}
        <Route element={<ProtectedRoutes isAllowed={!isLoggedIn} />}>
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/adminlogin" element={<AdminLogin/>} />
        </Route>

        {/* Routes manage for provider */}
        <Route path="/provider/*" element={<Provider isAllowed={!!profile && profile.rol === "proveedor"}/>}>
          <Route path="workcreation" element={<WorkCreationForm />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="worklist" element={<WorkListProvider />} />
          <Route path="workedit/:id" element={<WorkEditForm />} />
          <Route path="workinprogress" element={<WorkListInProgress />} />
        </Route>

        {/* Routess manage for volunter */}
        <Route path="/volunteer/*" element={<Volunteer isAllowed={!!profile && profile.rol === "voluntario"}/>}>
          <Route path="myworks" element={<WorkListVolunteer />} />
          <Route path="myprofile" element={<ProfileVolunteer />} />
          <Route path="editprofile/:id" element={<EditVolunteerProfile />} />
          <Route path="workview/:id" element={<WorkViewVolunteer />} />
          <Route path="calendar" element={<CalendarVolunteer />} />
        </Route>

        {/* Routess manage for Admin */}
        <Route path="/admin/*" element={<Admin />}>
          <Route path="userstable" element={<UsersTable />} />
          <Route path="edituser/:id" element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
