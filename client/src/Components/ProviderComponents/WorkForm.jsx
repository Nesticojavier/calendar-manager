import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import "./WorkCreationForm.css";

export default function WorkForm({ work, onSubmit, edit, tagsDB }) {
  //Library for render form
  const inputs = [
    {
      id: 1,
      name: "workTitle",
      type: "text",
      placeholder: "Titulo del trabajo",
      errormessage: "Titulo del trabajo no debe incluir caracteres especiales.",
      label: "Titulo del trabajo",
      required: true,
      pattern: "[a-zA-ZñÑ ]{1,64}$",
    },
    {
      id: 2,
      name: "workDescription",
      type: "text",
      placeholder: "Descripción del trabajo",
      errormessage:
        "Descripción del trabajo no debe incluir caracteres especiales.",
      label: "Descripción del trabajo",
      required: true,
      pattern: "[a-zA-ZñÑ ]{1,200}$",
    },
    {
      id: 3,
      name: "workersNeeded",
      type: "number",
      placeholder: "Cantidad de voluntarios necesarios",
      errormessage: "Debe ingresar una cantidad de voluntarios necesarios.",
      label: "Cantidad de voluntarios necesarios",
      required: true,
      min: 1,
      max: 100,
    },
    {
      id: 4,
      name: "workType",
      type: "select",
      placeholder: "Tipo de trabajo",
      errormessage: "Debe seleccionar un tipo de trabajo.",
      label: "Tipo de trabajo",
      required: true,
      options: [
        { value: "", label: "Seleccione un tipo de trabajo" },
        { value: "1", label: "Recurrente" },
        { value: "2", label: "Una sesión" },
      ],
    },
  ];

  // blocks of hours and days
  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
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

  //// CONTROLLERS INPUTS

  // State used to control some form values
  const [values, setValues] = useState({
    workTitle: work.workTitle,
    workDescription: work.workDescription,
    workersNeeded: work.workersNeeded,
    workType: work.workType,
    startDate: work.startDate,
    endDate: work.endDate,
  });

  // state used to control the blocks of hours for recurrent work
  const [blocks, setBlocks] = useState(work.blocks);

  // State used to control tags values
  const [selectedTags, setSelectedTags] = useState(work.tags);

  const [focused, setFocused] = useState({
    workTitle: false,
    workDescription: false,
    workType: false,
    workDate: false,
    workersNeeded: false,
  });

  const RECURRENT = values.workType == "1";
  const SESSION = values.workType == "2";

  /// HANDLERS FOR FORM MANAGE

  // Function to validate the dates of the work
  function validateDates(startDate, endDate) {
    if (startDate && endDate) {
      if (startDate > endDate) {
        // Start date is greater than end date
        setShowErrorDate(true);
        return false;
      } else {
        // Dates are valid
        return true;
      }
    }
  }

  // It is used to change the state of focused to true when the input is focused
  const handleFocus = (e, isFocused) => {
    setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });

    // If either the start or end date inputs were changed, validate the dates
    if (name === "startDate" || name === "endDate") {
      // Get the current values of the start and end date inputs from the state
      const { startDate, endDate } = values;
      console.log("##########");
      console.log(endDate);
      console.log("##########");
      // Call the validateDates function with the current start and end dates
      validateDates(startDate, endDate);
    }
  };

  const handleChangeSelect = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // this is used to increase the number of blocks
  const handleMore = (e) => {
    setBlocks([...blocks, { day: "", hour: "" }]);
  };

  // It is used to change the state of the hour and day blocks.
  const handleBlockChange = (blockIndex, e) => {
    const { name, value } = e.target;
    setBlocks((prevBlocks) =>
      prevBlocks.map((block, index) =>
        index === blockIndex ? { ...block, [name]: value } : block
      )
    );
  };

  const handleChangeSessionDay = (e) => {
    const { value } = e.target;
    console.log(value);
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[0].day = value;
      return updatedBlocks;
    });

    // set endDate = startDate form session work
    setValues({ ...values, ["startDate"]: value, ["endDate"]: value });
  };

  const handleChangeSessionHour = (e) => {
    const { value } = e.target;
    setBlocks((prevBlocks) => {
      const updatedBlocks = [...prevBlocks];
      updatedBlocks[0].hour = value;
      return updatedBlocks;
    });
  };

  // To display the error message for blocks
  const [showError, setShowError] = useState(false);

  // To display the error message for tags
  const [showErrorTags, setShowErrorTags] = useState(false);

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

  // Filter for show just one tags suggest
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    limit: 1,
  });

  // Function for send form
  const handleSubmit = (event) => {
    event.preventDefault();

    // show error message if blocks variable is void
    if (blocks.length === 0) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 1000);
    } else if (selectedTags.length === 0) {
      setShowErrorTags(true);
      setTimeout(() => {
        setShowErrorTags(false);
      }, 1000);
    } else {
      const valuesEnd = {
        ...values,
        blocks,
        workTags: selectedTags,
        tags: selectedTags,
      };
      onSubmit(valuesEnd);
    }
  };

  useEffect(() => {
    // when swicht to session mode
    if (values.workType === "2") {
      setBlocks([{ day: "", hour: "" }]);
    } else if (values.workType === "1") {
      setBlocks([]);
      setValues((prevValues) => ({
        ...prevValues,
        workDate: "",
      }));
    }
  }, [values.workType]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      className="workForm"
      sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {inputs.map((input) => {
        return (
          <div key={input.name} className="workCreationForm">
            <label htmlFor={input.id}>{input.label}</label>

            {input.type === "select" ? (
              <select
                name={input.name}
                id={input.id}
                onChange={handleChangeSelect}
                value={values[input.name]}
              >
                {input.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : (
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
              />
            )}
            {focused[input.name] && <span>{input.errormessage}</span>}
          </div>
        );
      })}
      {RECURRENT || SESSION ? (
        // if is selected the work by recurrent
        RECURRENT ? (
          <div className="workRecurrent">
            {blocks.map((block, blockIndex) => {
              return (
                <div key={blockIndex}>
                  <p className="nameBlock">
                    Seleccione el bloque {blockIndex + 1}
                  </p>
                  <div className="recurrentBlocks">
                    <div className="selectDay">
                      <label htmlFor="">Dia</label>
                      <select
                        required
                        name="day"
                        value={block.day}
                        onChange={(e) => handleBlockChange(blockIndex, e)}
                        id=""
                      >
                        <option value="">Seleccione un día</option>
                        {days.map((day) => (
                          <option key={day} value={day}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="selectHour">
                      <label htmlFor="">Hora</label>
                      <select
                        required
                        name="hour"
                        value={block.hour}
                        onChange={(e) => handleBlockChange(blockIndex, e)}
                        id=""
                      >
                        <option value="">Seleccione una hora</option>
                        {hours.map((hour) => (
                          <option key={hour} value={hour}>
                            {hour}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              );
            })}

            {blocks.length === 0 && showError && (
              <p className="error-message">Debe agregar al menos un bloque</p>
            )}

            <button
              disabled={blocks.length >= 2}
              className="more"
              type="button"
              onClick={handleMore}
            >
              Agregar bloque
            </button>

            <div className="startDate">
              <label htmlFor="">Fecha de inicio</label>
              <input
                name={"startDate"}
                type={"date"}
                placeholder="Fecha de inicio"
                label={"Fecha de inicio"}
                required={true}
                value={values.startDate}
                // Ensures that the state always reflects the current value of the input
                // and stays in sync with changes made by the user
                onChange={handleChange}
                // To display the error message when the input is focused
                // set to true to keep the error message as long as the input is invalid
                onBlur={() => handleFocus("startDate", true)}
              ></input>

              <label htmlFor="">Fecha de culminación</label>
              <input
                name={"endDate"}
                type={"date"}
                placeholder="Fecha de culminación"
                label={"Fecha de culminación"}
                required={true}
                value={values.endDate}
                // Ensures that the state always reflects the current value of the input
                // and stays in sync with changes made by the user
                onChange={handleChange}
                // To display the error message when the input is focused
                // set to true to keep the error message as long as the input is invalid
                onBlur={() => handleFocus("endDate", true)}
              ></input>

            </div>
          </div>
        ) : (
          // if is selected work by session
          <div className="workBySession">
            <div>
              <label htmlFor={5}>Seleccione la fecha del trabajo </label>
              <input
                className="inputDayForm"
                name={"workDate"}
                type={"date"}
                placeholder={"Fecha del trabajo"}
                label={"Fecha del trabajo"}
                required={true}
                value={values.endDate}
                // Ensures that the state always reflects the current value of the input
                // and stays in sync with changes made by the user
                onChange={handleChangeSessionDay}
                // The value of the input is bound to the value stored in values[input.name]
                // value={values["workDate"]}

                // To display the error message when the input is focused
                // set to true to keep the error message as long as the input is invalid
                onBlur={() => handleFocus("workDate", true)}
              />
              {focused["workDate"] && (
                <span className="error-message">
                  Debe seleccionar una fecha.
                </span>
              )}
            </div>

            <div>
              <label htmlFor="">Hora</label>
              <select
                className="selectHourForm"
                required
                name="hour"
                value={blocks[0]?.hour}
                onChange={handleChangeSessionHour}
                id=""
              >
                <option value="">Seleccione una hora</option>
                {hours.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )
      ) : null}

      {/*Part of workTags*/}
      <label className="labelTag" htmlFor="workTags-input">
        Ingrese las etiquetas
      </label>

      <div>
        <Autocomplete
          sx={{ maxWidth: 700, marginLeft: "15px" }}
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
              placeholder="Ingrese etiqueta y presione enter"
            />
          )}
        />
        {showErrorTags && (
          <p className="error-message">
            El tag debe ser de 2 palabras, máximo 16 caracteres, no debe
            repetirse y no debe contener comas.
          </p>
        )}
      </div>

      <Button
        className="button-form"
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
        {edit ? "Actualizar" : "Crear"}
      </Button>
    </Box>
  );
}
