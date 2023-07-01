import Cookies from "js-cookie";
import {
  Box,
  Modal,

} from '@mui/material';

import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, Navigate } from "react-router-dom";

import "./editUser.css"

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function EditUser({ user, handleClose }) {

  // A state is created for the values of the form inputs
  // Saved to an object with empty initial values
  const [values, setValues] = useState({
    username: user.username,
    password: ""
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
  const [errorMessage, setErrorMessage] = useState('');

  // To redirect to another page
  const navigate = useNavigate()

  // It is executed when the form is submitted
  const handleSubmit = (e) => {
    e.preventDefault();

    const token = Cookies.get("token");
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put("http://localhost:3000/admin/updatepwd", values, {headers})
      .then((response) => {
        // Handle request response successful
        swal({
          title: "Contraseña actualizada exitosamente",
          icon: "success",
        }).then(() => {
          handleClose();
        })

      })
      .catch((error) => {
        // Handle request error
        setErrorMessage(error.response.data.message)
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
      placeholder: "Usuario",
      errormessage: "El nombre de usuario no debe tener más de 16 caracteres y no debe incluir ningún carácter especial.",
      label: "Usuario",
      required: true,
      pattern: "[a-zA-Z0-9]{1,16}$",
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Introduzca la nueva contraseña",
      errormessage: "La contraseña debe tener al menos 3 caracteres y no debe incluir ningún carácter especial.",
      label: "Contraseña",
      required: true,
      pattern: "[a-zA-Z0-9]{3,}$",
    }
  ]
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        {/* <div className="auth-form-container"> */}
        <div className="change-password-form-container">
          {/* <div sx={style2}> */}
          <h1>Cambiar cotraseña de usuario</h1>
          <form className="" onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <div key={input.id} className="">
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

                  readOnly={input.name === 'username'}

                // Shows the error message if the input is focused and the value does not match the pattern
                //focused = {focused.toString()}
                />
                {focused[input.name] && <span>{input.errormessage}</span>}
              </div>
            ))}
            <button type="submit">Actualizar </button>
          </form>
          <p className="error">{errorMessage}</p>
        </div>
      </Box>
    </Modal >
  );
};
