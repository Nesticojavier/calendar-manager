import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  TextField,
  Avatar,
} from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { volunteerService } from "../../Services/Api/volunteerService";

export default function ProfileVolunteer() {
  const navigate = useNavigate();

  // Get data necesary from state location
  const location = useLocation();
  const { blocks, tags } = location.state.user;

  // console.log(location.state.user);

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

    volunteerService
      .editProfile(valuesEnd)
      .then(() => {
        swal({
          title: "Perfil actualizado exitosamente",
          icon: "success",
        }).then(() => {
          navigate(`/volunteer/myprofile`);
        });
      })
      .catch((error) => {
        console.error(error);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </Button>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              bgcolor: "rgb(1, 20, 128)",
              width: "80px",
              height: "80px",
              fontSize: "40px",
            }}
          >
            {location.state.user.fullName[0]}
          </Avatar>
          <Box
            sx={{
              textAlign: "left",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "10px",
              }}
            >
              <h1>{location.state.user.fullName}</h1>
              <p>@{location.state.user.username}</p>
            </div>
          </Box>
        </div>
      </Box>

      <Box
        sx={{
          textAlign: "left",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box sx={{ mr: 15, mt: 5 }}>
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

        <Box sx={{ ml: 15, mt: 5 }}>
          {/*Part of workTags*/}
          <h3 style={{ marginTop: 10, marginBottom: 10 }}>
            Agrega tus tags de preferencia
          </h3>
          <label
            className="labelTag"
            htmlFor="workTags-input"
            style={{ marginLeft: "-5px" }}
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
                sx={{ width: 400 }}
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
          marginTop: "30px",
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
