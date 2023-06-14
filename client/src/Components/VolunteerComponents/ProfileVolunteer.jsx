import React, { useState } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function ProfileVolunteer() {
  // this obtein the data from the user
  // const handleProfile = () => {
  //   axios.get("http://localhost:3001/volunteer/profile")
  // }

  // A state is created for the values of the form inputs
  // Saved to an object with the data of the user as initial values
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
      type: "date",
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
    {
      id: 7,
      name: "label",
      type: "text",
      placeholder: "Agregar etiqueta",
      errormessage: "Debes agregar al menos una etiqueta",
      label: "Etiqueta",
      required: true,
    },
    {
      id: 8,
      name: "time",
      type: "select",
      placeholder: "Agregue el horario de preferencia",
      errormessage: "Debes agregar al menos un horario de preferencia",
      label: "Horario de preferencia",
      required: true,
      options: [
        { value: "7:00 AM", label: "7:00 AM" },
        { value: "8:00 AM", label: "8:00 AM" },
        { value: "9:00 AM", label: "9:00 AM" },
        { value: "10:00 AM", label: "10:00 AM" },
        { value: "11:00 AM", label: "11:00 AM" },
        { value: "12:00 PM", label: "12:00 PM" },
        { value: "1:00 PM", label: "1:00 PM" },
        { value: "2:00 PM", label: "2:00 PM" },
        { value: "3:00 PM", label: "3:00 PM" },
        { value: "4:00 PM", label: "4:00 PM" },
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
      <div>
        <AccountCircleIcon sx={{ fontSize: 100 }} />
        <h1>Nombre Apellido</h1>
      </div>
      <Box
        sx={{
          textAlign: "left",
        }}
      >
        {inputs.map((input) => (
          <div key={input.id}>
            {input.id <= 6 && (
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
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                />
              </>
            )}
            {input.id >= 7 && (
              <>
                <label htmlFor={input.name}>{input.label}</label>
                {input.type === "select" ? (
                  <select
                    id={input.name}
                    name={input.name}
                    value={values[input.name]}
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {input.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    value={values[input.name]}
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  />
                )}
              </>
            )}
          </div>
        ))}
      </Box>
    </Box>
  );
}
