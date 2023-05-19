import React, { useState } from "react";
import axios from 'axios';
import swal from "sweetalert";

const Signup = (props) => {
    // Se crea un estado para los valores de los inputs del formulario
    // Se guarda en un objeto con los valores iniciales vacíos
    const [values, setValues] = useState({
        username: "",
        password: "",
        fullName: "",
        birthDate: "",
        institutionalId: "",
    });

    // Se crea un estado para saber si el input está enfocado o no
    const [focused, setFocused] = useState(false);

    // Se crea un estado para mostrar el error al enviar el form
    const [errorMessage, setErrorMessage] = useState('');

    // Se usa para cambiar el estado de focused a true cuando el input está enfocado
    const handleFocus = (e) => {
        setFocused(true);
    };

    // Se ejecuta al enviar el formulario
    const handleSubmit = (e) => {
        // Se usa para evitar que la página se recargue al enviar el formulario
        e.preventDefault();

        // se usa para enviar el formulario a traves del metodo post
        axios
            .post("http://localhost:3000/signup", values)
            .then((response) => {
                // Manejar solicitud la respuesta exitosa
                console.log(response.data);
                swal({
                    title: "Registrado exitosamente",
                    icon : "success",
                }).then(() => {
                    window.location.reload();
                })
            })
            .catch((error) => {
                // Manejar el error de la solicitud
                console.error(error.response.data.message);
                setErrorMessage(error.response.data.message)
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
        },
        {
          id: 3,
          name: "fullName",
          type: "text",
          placeholder: "Full Name",
          errormessage: "Full Name should be only letters and no more than 64 characters.",
          label: "Full Name",
          required: true,
          pattern: "[a-zA-Z ]{1,64}",
        },
        {
          id: 4,
          name: "birthDate",
          type: "date",
          placeholder: "Birth Date",
          label: "Birth Date",
          required: true
        },
        {
          id: 5,
          name: "institutionalId",
          type: "text",
          placeholder: "Institutional ID",
          errormessage: "Institutional ID should be only numbers and no more than 16 characters.",
          label: "Institutional ID",
          pattern: "[0-9.]{1,16}$",
        }
    ]

    return (
        <div className="auth-form-container">
            <h1>Sign Up</h1>
        <form className = "register-form" onSubmit={handleSubmit}>
            {inputs.map((input) => (
                <div key={input.id} className="formRegister">
                    <label htmlFor={input.id}>{input.label}</label>
                    <input
                        {...input}

                        // Garantiza que el estado refleje siempre el valor actual del input
                        // y se mantenga sincronizado con los cambios realizados por el usuario
                        onChange = {handleChange}

                        // Se enlaza el valor del input con el valor almacenado en values[input.name]
                        value={values[input.name]}

                        // Se usa para cambiar el estado de focused a true cuando el input está enfocado
                        onBlur = {handleFocus}

                        // Lo comento porque no veo que haga nada, pero no lo elimino porsia
                        // onFocus={ () =>
                        //     (input.name === "institutionalId")
                        //     && setFocused(true)
                        // }

                        // Muestra el mensaje de error si el input está enfocado y el valor no cumple con el patrón
                        focused = {focused.toString()}
                    />
                    <span>{input.errormessage}</span>
                </div>
            ))}
            <button type="submit">Sign Up</button>
        </form>
        <p className="error">{errorMessage}</p>
        <button className = "button-switch" onClick={() => props.onFormSwitch('login')}>
            Already have an account? Login here.
        </button>
        </div>
    );
}

export default Signup;
