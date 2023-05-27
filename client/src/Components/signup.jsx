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

    // A state is created for the values of the form inputs
    // Saved to an object with empty initial values
    const [values, setValues] = useState({
        username: "",
        password: "",
        fullName: "",
        birthDate: "",
        institutionalId: "",
        rol: "voluntario",
    });

    // A state is created to know if the input is focused or not
    const [focused, setFocused] = useState({
        username: false,
        password: false,
        fullName: false,
        birthDate: false,
        institutionalId: false,
        rol: false,
    });

    // A state is created to show the error when submitting the form
    const [errorMessage, setErrorMessage] = useState('');

    // It is used to change the state of focused to true when the input is focused
    const handleFocus = (e, isFocused) => {
        setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
    };

    // It is executed when the form is submitted
    const handleSubmit = (e) => {
        // Used to prevent the page from reloading on form submission
        e.preventDefault();

        // Used to submit the form via the post method
        axios
            .post("http://localhost:3000/signup", values)
            .then((response) => {
                // Handle request response successful
                swal({
                    title: "Registrado exitosamente",
                    icon : "success",
                }).then(() => {
                    navigate("/login"), {replace : true};
                })
            })
            .catch((error) => {
                // Handle request error
                console.error(error.response.data.message);
                setErrorMessage(error.response.data.message)
            });
    };

    // It is used to update the state of the values of the inputs
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

    // Form inputs with their restrictions and message errors
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

                                // Ensures that the state always reflects the current value of the input
                                // and stays in sync with changes made by the user
                                onChange = {handleChange}

                                // The value of the input is bound to the value stored in values[input.name]
                                value={values[input.name]}

                                // To display the error message when the input is focused
                                // set to true to keep the error message as long as the input is invalid
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
