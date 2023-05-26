import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Login ({ setIsLoggedIn }) {

    if (Cookies.get('token')) {
        return <Navigate to={"/dashboard"} replace />;
    }

    // Se crea un estado para los valores de los inputs del formulario
    // Se guarda en un objeto con los valores iniciales vacíos
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    // Se crea un estado para saber si el input está enfocado o no
    const [focused, setFocused] = useState({
        username: false,
        password: false,
    });

    // Se usa para cambiar el estado de focused a true cuando el input está enfocado
    const handleFocus = (e, isFocused) => {
        setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
    };

    // Se crea un estado para mostrar el error al enviar el form
    const [errorMessage, setErrorMessage] = useState('');

    // Para redireccionar a otra página
    const navigate = useNavigate()

    // Se usa para evitar que la página se recargue al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .post("http://localhost:3000/login", values)
            .then((response) => {
                // Manejar solicitud la respuesta exitosa
                const token = response.data.token

                // localStorage.setItem('token', token);
                Cookies.set('token', token, { expires: 1 });

                // Redireccionar al dashboard
                setIsLoggedIn(true);
                navigate('/dashboard')

            })
            .catch((error) => {
                // Manejar el error de la solicitud
                
                // console.error(error.response.data.message);
                console.error(error);
                // setErrorMessage(error.response.data.message)
                setErrorMessage(error)
            });

    };

    // Se usa para actualizar el estado de los valores de los inputs
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    // Inputs del formulario con sus restricciones y errores de mensaje
    const inputs = [
        {
          id: 1,
          name: "username",
          type: "text",
          placeholder: "Username",
          errormessage: "Username should be no more than 16 characters and shouldn't include any special character.",
          label: "Username",
          required: true,
          pattern: "[a-zA-Z0-9]{1,16}$",
        },
        {
          id: 2,
          name: "password",
          type: "password",
          placeholder: "Password",
          errormessage: "Password should be at least 3 characters long and shouldn't include any special character.",
          label: "Password",
          required: true,
          pattern: "[a-zA-Z0-9]{3,}$",
        }
      ]

    return (
        <div className="auth-form-container">
            <h1>Login</h1>
            <form className = "login-form" onSubmit={handleSubmit}>
                {inputs.map((input) => (
                    <div key={input.id} className = "formLogin">
                        <label htmlFor={input.name}>{input.label}</label>
                        <input
                            {...input}

                            // Garantiza que el estado refleje siempre el valor actual del input
                            // y se mantenga sincronizado con los cambios realizados por el usuario
                            onChange={handleChange}

                            // Se enlaza el valor del input con el valor almacenado en values[input.name]
                            value={values[input.name]}

                            /// Para mostrar el mensaje de error cuando el input está enfocado
                            // esta en true para mantener el mensaje de error mientras el input sea invalido
                            onBlur = {() => handleFocus(input.name, true)}

                            // Muestra el mensaje de error si el input está enfocado y el valor no cumple con el patrón
                            //focused = {focused.toString()}
                        />
                        {focused[input.name] && <span>{input.errormessage}</span>}
                    </div>
                ))}
                <button type="submit">Log In</button>
            </form>
            <p className="error">{errorMessage}</p>
            <button className = "button-switch" onClick={() => navigate("/signup")}>
                Don't have an account? Sign up here.
            </button>
        </div>
    );
}

