import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../Context/UserContext";
import { authService } from "../../Services/Api/authService";

export default function Login() {
  const { changeLoggedIn } = useContext(UserContext);

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
    authService
      .login(values)
      .then((response) => {
        Cookies.set("token", response.token, { expires: 1 });
        changeLoggedIn(true);
        navigate("/");
      })
      .catch((error) => setErrorMessage(error.response.data.data.error));
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
      errormessage:
        "El nombre de usuario no debe tener más de 16 caracteres y no debe incluir ningún carácter especial.",
      label: "Nombre de usuario",
      required: true,
      pattern: "[a-zA-Z0-9]{1,16}$",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Contraseña",
      errormessage:
        "La contraseña debe tener al menos 3 caracteres y no debe incluir ningún carácter especial.",
      label: "Contraseña",
      required: true,
      pattern: "[a-zA-Z0-9]{3,}$",
    },
  ];

  return (
    <div className="App">
      <div className="auth-form-container">
        <h1>Iniciar sesión</h1>
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
                // To display the error message when the input is focused
                // set to true to keep the error message as long as the input is invalid
                onBlur={() => handleFocus(input.name, true)}

                // Shows the error message if the input is focused and the value does not match the pattern
                //focused = {focused.toString()}
              />
              {focused[input.name] && (
                <span className="error-message">{input.errormessage}</span>
              )}
            </div>
          ))}
          <button className="button-form" type="submit">
            Iniciar sesión
          </button>
        </form>
        <p className="error">{errorMessage}</p>
        <button
          className="button-switch"
          onClick={() => navigate("/adminlogin")}
        >
          ¿Eres administrador? Inicia sesión aquí.
        </button>
        <button className="button-switch" onClick={() => navigate("/signup")}>
          ¿No tienes una cuenta? Regístrate aquí.
        </button>
      </div>
    </div>
  );
}
