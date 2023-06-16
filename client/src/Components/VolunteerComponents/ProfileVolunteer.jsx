import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

export default function ProfileVolunteer() {
  // const token = Cookies.get("token");
  // const headers = { Authorization: `Bearer ${token}` };

  // // A state is created for the data of the user
  // const [userData, setUserData] = useState([]);

  // To navigate to the edit profile page
  const navigate = useNavigate();
  const handleEdit = (user) => {
    navigate(`/volunteer/editprofile/${user.id}`, { state: { user } });
  };

  // // this obtein the data from the user
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3000/volunteer/user", { headers })
  //     .then((response) => {
  //       setUserData(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error.response.data.message);
  //     });
  // });

  // A state is created for the values of the form inputs
  // Saved to an object with the data of the user as initial values
  const [values, setValues] = useState({
    username: "pepito",
    password: "jajajaja",
    fullName: "ola k ase",
    birthDate: "01/01/2000",
    institutionalId: "123456789",
    rol: "Voluntario",
  });

  // inputs with their restrictions and message errors
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
    {
      id: 3,
      name: "fullName",
      type: "text",
      placeholder: "Nombre completo",
      errormessage:
        "El nombre completo debe contener solo letras y no tener mas de 64 caracteres.",
      label: "Nombre completo",
      required: true,
      pattern: "[a-zA-Z ]{1,64}",
    },
    {
      id: 4,
      name: "birthDate",
      type: "text",
      placeholder: "Fecha de nacimiento",
      label: "Fecha de nacimiento",
      required: true,
    },
    {
      id: 5,
      name: "institutionalId",
      type: "text",
      placeholder: "ID Institucional",
      errormessage:
        "El ID institucional debe contener solo números y no tener mas de 16 caracteres.",
      label: "ID Institucional",
      pattern: "[0-9.]{1,16}$",
    },
    {
      id: 6,
      name: "rol",
      type: "select",
      placeholder: "seleccione rol",
      errormessage: "Debes seleccionar un rol",
      label: "Rol",
      required: true,
      options: [
        { value: "voluntario", label: "Voluntario" },
        { value: "proveedor", label: "Proveedor" },
      ],
    },
  ];

  return (
    <Box
      flex={7}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vh",
        overflow: "auto",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {/* {userData.map((user) => ( */}
      <>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "30px",
            }}
          >
            <AccountCircleIcon sx={{ fontSize: 100 }} />
            <IconButton onClick={() => handleEdit(user)}>
              <EditIcon />
            </IconButton>
          </div>
          <h1>Nombre Apellido</h1>
          {/* <h1>{user.fullName}</h1> */}
        </div>
        <Box
          sx={{
            textAlign: "left",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {inputs.map((input) => (
            <div key={input.id}>
              <>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  id={input.name}
                  name={input.name}
                  type={input.type}
                  value={values[input.name]}
                  readOnly
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "flex-start",
                    alignItems: "center",
                  }}
                />
              </>
            </div>
          ))}
        </Box>
      </>
      {/* ))} */}
    </Box>
  );
}
