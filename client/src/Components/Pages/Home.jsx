import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { authService } from "../../Services/Api/authService";

export default function Home() {
  const [rol, setRol] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { isLoggedIn, changeProfile } = useContext(UserContext);

  useEffect(() => {
    if (isLoggedIn) {
      authService
        .dashboard()
        .then((data) => {
          setRol(data.rol);
          changeProfile(data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (rol === "proveedor") {
        navigate("/provider/calendar", { replace: true });
      } else if (rol === "voluntario") {
        navigate("/volunteer/calendar", { replace: true });
      }
    }
  }, [rol, isLoading, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="homepage">
      <div className="hometitle">
        <h1>Bienvenido al Calendar Manager para trabajo voluntario</h1>
      </div>
    </div>
  );
}
