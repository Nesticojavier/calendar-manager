import React, { useState } from "react";
import axios from 'axios';
import swal from "sweetalert";
import Cookies from 'js-cookie';
import { useNavigate, Navigate } from "react-router-dom";


const Signup = () => {
    
    if (Cookies.get('token')) {
        return <Navigate to={"/dashboard"} replace />;
    }
    
    const navigate = useNavigate()
    // Se crea un estado para los valores de los inputs del formulario
    // Se guarda en un objeto con los valores iniciales vacíos
    const [values, setValues] = useState({
        username: "",
        password: "",
        fullName: "",
        birthDate: "",
        institutionalId: "",
        rol: "voluntario",
    });

    // Se crea un estado para saber si el input está enfocado o no
    const [focused, setFocused] = useState({
        username: false,
        password: false,
        fullName: false,
        birthDate: false,
        institutionalId: false,
        rol: false,
    });

    // Se crea un estado para mostrar el error al enviar el form
    const [errorMessage, setErrorMessage] = useState('');

    // Se usa para cambiar el estado de focused a true cuando el input está enfocado
    const handleFocus = (e, isFocused) => {
        setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
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
                swal({
                    title: "Registrado exitosamente",
                    icon : "success",
                }).then(() => {
                    navigate("/login"), {replace : true};
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
    const handleChangeSelect = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [   name]: value,
        }));
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
        },
        {
          id: 6,
          name: "rol",
          type: "select",
          placeholder: "seleccione rol",
          errormessage: "you must select a role",
          label: "Seleccione rol",
          required: true,
          options: [
            { value: "voluntario", label: "Voluntario" },
            { value: "proveedor", label: "Proveedor" }
          ]
        }
    ]

    return (
        <div className="App">

            <div className="auth-form-container">
                <h1>Sign Up</h1>
                <form className = "register-form" onSubmit={handleSubmit}>
                    {inputs.map((input) => (
                        <div key={input.id} className="formRegister">
                            <label htmlFor={input.id}>{input.label}</label>
                            
                            {input.type === "select"
                            ? 
                            <select name={input.name} id={input.id} onChange = {handleChangeSelect}>
                                {input.options.map(option => (
                                    <option key={option.value} value={option.value}>
                                    {option.label}
                                    </option>
                                ))}
                            </select>
                            :  
                            <input
                                {...input}
                                
                                // Garantiza que el estado refleje siempre el valor actual del input
                                // y se mantenga sincronizado con los cambios realizados por el usuario
                                onChange = {handleChange}

                                // Se enlaza el valor del input con el valor almacenado en values[input.name]
                                value={values[input.name]}

                                // Para mostrar el mensaje de error cuando el input está enfocado
                                // esta en true para mantener el mensaje de error mientras el input sea invalido
                                onBlur = {() => handleFocus(input.name, true)}

                                //onFocus = {() => handleFocus(input.name, true)}

                                //focused = {focused.toString()}
                            />

                            }
                            {focused[input.name] && <span>{input.errormessage}</span>}
                        </div>
                    ))}
                    <button type="submit">Sign Up</button>
                </form>
                <p className="error">{errorMessage}</p>
                <button className = "button-switch" onClick={() => navigate("/login")}>
                    Already have an account? Login here.
                </button>
            </div>
        </div>
    );
}

export default Signup;
