import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";
import { authService } from "../../Services/Api/authService";

export default function AdminLogin() {
  const { changeLoggedIn, isLoggedIn, changeProfile } = useContext(UserContext);

  // A state is created for the values of the form inputs
  // Saved to an object with empty initial values
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  // A state is created to know if the input is focused or not
  const [focused, setFocused] = useState({
    username: false,
    password: false,
  });

  // It is used to change the state of focused to true when the input is focused
  const handleFocus = (e, isFocused) => {
    setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
  };

  // A state is created to show the error when submitting the form
  const [errorMessage, setErrorMessage] = useState("");

  // To redirect to another page
  const navigate = useNavigate();

  // It is executed when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    // axios
    //   .post("http://localhost:3000/admin/login", values)
    //   .then((response) => {
    //     // Handle request response successful
    //     const token = response.data.token;

    //     // localStorage.setItem('token', token);
    //     Cookies.set("token", token, { expires: 1 });
    //     changeLoggedIn(true);

    //     // Redirect to
    //     navigate("/admin/userstable");
    //   })
    //   .catch((error) => {
    //     // Handle request error
    //     console.log(error.response.data.message);
    //     // setErrorMessage(error.response.data.message)
    //   });

    authService
      .adminLogin(values)
      .then((response) => {
        Cookies.set("token", response.token, { expires: 1 });
        changeLoggedIn(true);
        changeProfile({ rol: "admin" });

        navigate("/admin/userstable");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // It is used to update the state of the values of the inputs
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Form inputs with their restrictions and message errors
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nombre de usuario",
      label: "Nombre de usuario",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      label: "Contraseña",
      required: true,
    },
  ];

  return (
    <div className="App-admin">
      <div className="auth-form-container">
        <h1>Iniciar sesión Administrador</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <div key={input.id} className="formLogin">
              <label htmlFor={input.name}>{input.label}</label>
              <input
                {...input}
                // Ensures that the state always reflects the current value of the input
                // and stays in sync with changes made by the user
                onChange={handleChange}
                // The value of the input is bound to the value stored in values[input.name]
                value={values[input.name]}
              />
            </div>
          ))}
          <button type="submit" className="button-admin">
            Iniciar sesión
          </button>
        </form>
        <button
          className="button-switch-admin"
          onClick={() => navigate("/login")}
        >
          ¿Eres proveedor o voluntario? Inicia sesión aquí.
        </button>
      </div>
    </div>
  );
}
