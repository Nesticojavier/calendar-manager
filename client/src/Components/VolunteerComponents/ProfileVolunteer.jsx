import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useContext } from "react";

export default function ProfileVolunteer() {
  // extract user from context
  const { profile } = useContext(UserContext);
  const values = profile;

  // To navigate to the edit profile page
  const navigate = useNavigate();
  const handleEdit = (user) => {
    navigate(`/volunteer/editprofile/${user.id}`, { state: { user } });
  };

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
      name: "institucionalId",
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
            <IconButton onClick={() => handleEdit(values)}>
              <EditIcon />
            </IconButton>
          </div>
          {/* <h1>Nombre Apellido</h1> */}
          <h1>{values.fullName}</h1>
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
          <div>
            <label>Horarios de preferencia</label>
            <ul>
              {values.blocks?.map((block, index) => (
                <li key={index}>{block}</li>
              ))}
            </ul>
          </div>
          <div>
            <label>Mis etiquetas</label>
            <ul>
              {values.tags?.map((tag, index) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          </div>
        </Box>
      </>
      {/* ))} */}
    </Box>
  );
}
