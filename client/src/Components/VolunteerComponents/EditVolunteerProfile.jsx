import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Cookies from "js-cookie";

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
    rol: "Voluntario",
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
      id: 8,
      name: "time",
      type: "select-multiple",
      maxSelections: 3,
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

  const [selectedValues, setSelectedValues] = useState([]);


  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked && selectedValues.length < 3) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((val) => val !== value)
      );
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();

    const valuesEnd = {
      tags : workTags,
      blocks : selectedValues
    };
    console.log(valuesEnd);
    // get token from cookies
    const token = Cookies.get("token");
    // construct object representing an HTTP authorization header with the Bearer scheme.
    const headers = { Authorization: `Bearer ${token}` };
    axios
      .put("http://localhost:3000/volunteer/profile", valuesEnd, { headers })
      .then((response) => {
        // Handle request response successful
        swal({
          title: "Perfil actualizado exitosamente",
          icon: "success",
        }).then(() => {
          navigate(`/myprofile`);
        });
      })
      .catch((error) => {
        // Handle request error
        console.error(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  }

  const [showErrorTags, setShowErrorTags] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const [workTags, setTags] = useState([]);

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {

      // Split the tag value into an array of words
      const words = tagValue.split(" ");

      // Check if the number of words is less than or equal to 2
      if (words.length <= 2) {

        // Check if the length of the tagValue is less than or equal to 16
        if (tagValue.length <= 16) {

          // Check if the tag already exists in the workTags array
          if (!workTags.includes(tagValue)) {
            setTags([...workTags, tagValue]);
            setTagValue("");
          } else {
            setShowErrorTags(true);
          }
        } else {
          setShowErrorTags(true);
        }
      } else {
        setShowErrorTags(true);
      }


    }
  };

  // When the tag is deleted
  const deleteTag = (val) => {
    let reaminTags = workTags.filter((t) => t !== val);
    setTags(reaminTags);
  }



  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
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
        <h1>Editar preferencias</h1>
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
            {input.id <= 6 && (
              <>
                <label htmlFor={input.name}>{input.label}</label>
                <input
                  id={input.name}
                  name={input.name}
                  type={input.type}
                  value={values[input.name]}
                  onChange={handleChange}
                  style={{
                    border: "1px solid black",
                    display: "flex",
                    flexDirection: "flex-start",
                    alignItems: "center",
                  }}
                />
              </>
            )}
            {input.id >= 7 && (
              <Box
                sx={{
                  textAlign: "left",
                  alignItems: "left",
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "70px",
                }}
              >
                <label
                  htmlFor={input.name}
                  style={{
                    marginBottom: "0px",
                  }}
                >
                  {input.label}
                </label>
                {input.type === "select-multiple" ? (
                  <>
                    {input.options.map((option) => (
                      <div
                        key={option.value}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <input
                          id={option.value}
                          type="checkbox"
                          name={input.name}
                          value={option.value}
                          onChange={handleCheckboxChange}
                          style={{
                            margin: "-85px",
                          }}
                        />
                        <label
                          htmlFor={option.value}
                          style={{
                            marginRight: "200px",
                          }}
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </>
                ) : (
                  <input
                    id={input.name}
                    name={input.name}
                    type={input.type}
                    // value={values[input.name]}
                    style={{
                      border: "1px solid black",
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      marginRight: "80px",
                    }}
                  />
                )}
              </Box>
            )}

          </div>
        ))}
        <div>
          <label className="labelTag" htmlFor="workTags-input">Etiquetas</label>
          <div className="tagInput ">
            {workTags.map((item, index) => {
              return <button key={index}>
                {item}
                <p className="delete-tag"
                  onClick={() => deleteTag(item)}>
                  X
                </p>

              </button>
            })}
            <input
              name={"workTags"}
              type={"text"}
              placeholder={"Escriba los Tags y presione enter"}
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTags(e)
                }
              }}
            />
            {showErrorTags && (
              <p className="error-message">
                El tag debe ser de 2 palabras, máximo 16 caracteres y no debe repetirse.</p>
            )}

          </div>
        </div>
      </Box>
      <Button
        type="submit"
        variant="contained"
        sx={{
          marginTop: "20px",
          alignSelf: "center",
          background: "rgb(1, 20, 128)",
          borderRadius: "5px",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Guardar cambios
      </Button>
    </Box>
  );
}
