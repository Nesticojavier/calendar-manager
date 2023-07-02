import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import Cookies from "js-cookie";

export default function ProfileVolunteer() {
  const navigate = useNavigate();

  // Get data necesary from state location
  const location = useLocation();
  const { blocks, tags } = location.state.user;

  const hours = [
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  // state used to control the blocks of hours for the preferences of the user
  const [selectedHours, setSelectedHours] = useState([{ hour: "" }]);

  // State used to control tags values
  const [selectedTags, setSelectedTags] = useState([]);

  // It is used to change the state of the hour and day blocks.
  const handleBlockChange = (blockIndex, e) => {
    const { name, value } = e.target;
    setSelectedHours((prevBlocks) =>
      prevBlocks.map((block, index) =>
        index === blockIndex ? { ...block, [name]: value } : block
      )
    );
  };

  // this is used to increase the number of blocks
  const handleMore = (e) => {
    setSelectedHours([...selectedHours, { hour: "" }]);
  };

  // To display the error message for blocks
  const [showError, setShowError] = useState(false);

  // To display the error message for tags
  const [showErrorTags, setShowErrorTags] = useState(false);

  // Filter for show just one tags suggest
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    limit: 1,
  });

  // To handle the tags selected
  const handleTagSelection = (event, value) => {
    console.log(event);

    // if action is deleting
    if (value.length < selectedTags.length) {
      setSelectedTags(value);
      return;
    }

    // get new tag for add
    const newTag = value[value.length - 1];

    // verify tag before add to selected tags

    // Check if the tag value contains any special characters
    if (!/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(newTag)) {
      // Split the tag value into an array of words
      const words = newTag.split(" ");

      // Check if the number of words is less than or equal to 2
      if (words.length <= 2) {
        // Check if the length of the tagValue is less than or equal to 16
        if (newTag.length <= 16) {
          setSelectedTags(value);
        } else {
          setShowErrorTags(true);
        }
      } else {
        setShowErrorTags(true);
      }
    } else {
      setShowErrorTags(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const valuesEnd = {
      tags: selectedTags,
      blocks: selectedHours,
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
          navigate(`/volunteer/myprofile`);
        });
      })
      .catch((error) => {
        // Handle request error
        console.error(error.response.data.message);
      });
  };

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

          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box sx={{ mr: 15 }}>
          <h3 style={{ marginTop: 10 }}>Agrega tus horas de preferencia</h3>
          {selectedHours.map((block, blockIndex) => (
            <FormControl fullWidth key={blockIndex} sx={{ mb: 2, mt: 2 }}>
              <InputLabel id="hora" style={{ margin: "auto" }}>
                Hora
              </InputLabel>
              <Select
                labelId="selectHour"
                id="selectHour"
                name="hour"
                value={block.hour}
                label="Hora"
                onChange={(e) => handleBlockChange(blockIndex, e)}
              >
                {hours.map((hour) => (
                  <MenuItem key={hour} value={hour}>
                    {hour}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}

          {selectedHours.length === 0 && showError && (
            <p className="error-message">Debe agregar al menos un bloque</p>
          )}

          <Box
            sx={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button
              disabled={selectedHours.length >= 3}
              type="button"
              variant="contained"
              onClick={handleMore}
              sx={{
                background: "rgb(1, 20, 128)",
                borderRadius: "5px",
                fontSize: "14px",
                alignSelf: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              Agregar bloque
            </Button>
          </Box>
        </Box>

        <Box sx={{ ml: 15 }}>
          {/*Part of workTags*/}
          <h3 style={{ marginTop: 10, marginBottom: 10 }}>Agrega tus tags de preferencia</h3>
          <label
            className="labelTag"
            htmlFor="workTags-input"
            style={{ marginLeft: "-5px"}}
          >
            Ingrese las etiquetas
          </label>

          <Autocomplete
            sx={{ maxWidth: 700, marginBottom: "16px", marginTop: "16px" }}
            filterOptions={filterOptions}
            freeSolo
            multiple
            filterSelectedOptions
            id="tags-standard"
            options={tagsDB}
            value={selectedTags}
            onChange={handleTagSelection}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                // label="Multiple values"
                placeholder="Escriba la etiqueta y presione enter"
                sx = {{width: "100%"}}
              />
            )}
          />
          {showErrorTags && (
            <p className="error-message">
              El tag debe ser de 2 palabras, máximo 16 caracteres, no debe
              repetirse y no debe contener comas.
            </p>
          )}
        </Box>
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

// Sintetic data
const tagsDB = [
  "python",
  "programacion",
  "educacion",
  "java",
  "matematicas",
  "aprendizaje",
  "universidad",
  "escuela",
  "jardineria",
  "servicios",
];
