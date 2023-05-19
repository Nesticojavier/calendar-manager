import React, { useState } from "react";

const Login = (props) => {
    // Se crea un estado para los valores de los inputs del formulario
    // Se guarda en un objeto con los valores iniciales vacíos
    const [values, setValues] = useState({
        username: "",
        password: ""
    });

    // Se crea un estado para saber si el input está enfocado o no
    const [focused, setFocused] = useState(false);

    // Se usa para cambiar el estado de focused a true cuando el input está enfocado
    const handleFocus = (e) => {
        setFocused(true);
    };

    // Se usa para evitar que la página se recargue al enviar el formulario
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    // Se usa para actualizar el estado de los valores de los inputs
    const onChange = (e) => {
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
                    <label className = "labelForm" htmlFor={input.name}>{input.label}</label>
                    <input
                        {...input}

                        // Garantiza que el estado refleje siempre el valor actual del input
                        // y se mantenga sincronizado con los cambios realizados por el usuario
                        onChange={onChange}

                        // Se enlaza el valor del input con el valor almacenado en values[input.name]
                        value={values[input.name]}

                        // Se usa para cambiar el estado de focused a true cuando el input está enfocado
                        onBlur = {handleFocus}

                        // Muestra el mensaje de error si el input está enfocado y el valor no cumple con el patrón
                        focused = {focused.toString()}
                    />
                    <span>{input.errormessage}</span>
                </div>
            ))}
            <button type="submit">Log In</button>
        </form>
        <button className = "button-switch" onClick={() => props.onFormSwitch('register')}>
            Don't have an account? Sign up here.
        </button>
        </div>
    );
}

export default Login;
