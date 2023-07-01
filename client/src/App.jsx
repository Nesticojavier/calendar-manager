import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./Components/Pages/signup";
import Login from "./Components/Pages/login";
import Navbar from "./Components/Navbar";
import Home from "./Components/Pages/Home";
import { UserContext } from "./Context/UserContext";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import Provider from "./Components/Pages/Provider";
import CreateWork from "./Components/ProviderComponents/CreateWork";
import EditWork from "./Components/ProviderComponents/EditWork";
import CalendarProvider from "./Components/ProviderComponents/CalendarProvider";
import WorkListProvider from "./Components/ProviderComponents/WorkListProvider";
import WorkListInProgress from "./Components/ProviderComponents/WorkListInProgress";
import WorkInstanceTraking from "./Components/ProviderComponents/WorkInstanceTraking";

import Volunteer from "./Components/Pages/Volunteer";
import WorkViewVolunteer from "./Components/VolunteerComponents/WorkViewVolunteer";
import WorkListVolunteer from "./Components/VolunteerComponents/WorkListVolunteer";
import ProfileVolunteer from "./Components/VolunteerComponents/ProfileVolunteer";
import EditVolunteerProfile from "./Components/VolunteerComponents/EditVolunteerProfile";
import CalendarVolunteer from "./Components/VolunteerComponents/CalendarVolunteer";

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
          <Route path="workcreation" element={<CreateWork />} />
          <Route path="calendar" element={<CalendarProvider />} />
          <Route path="worklist" element={<WorkListProvider />} />
          <Route path="workedit/:id" element={<EditWork />} />
          <Route path="workinprogress" element={<WorkListInProgress />} />
          <Route path="work-instance-tracking/:id" element={<WorkInstanceTraking />} />
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
