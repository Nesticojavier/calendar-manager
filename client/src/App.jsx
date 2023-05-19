import React, { useState, useEffect } from "react";
import "./App.css";
import Signup from "./Components/signup";
import Login from "./Components/login";
//import UsersList from "./Components/UsersList";

function App() {
  // Se crea un estado para saber qué formulario se está mostrando
  const [currentForm, setCurrentForm] = useState("login");

  // Se usa para cambiar el estado de currentForm al formulario contrario
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {
        currentForm === "login"
        ? <Login onFormSwitch={toggleForm} />
        : <Signup onFormSwitch={toggleForm} />
      }

    </div>
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
