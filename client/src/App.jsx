import React, { useState, useEffect } from "react";
import UsersList from "./Components/UsersList";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api2")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <UsersList users={users}/>
    </>
  );
}

export default App;
