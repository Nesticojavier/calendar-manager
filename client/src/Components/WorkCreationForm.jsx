import React, { useState } from "react"
import { Box, Button } from '@mui/material'
import "./WorkCreationForm.css"

export default function WorkCreationForm() {
    const [values, setValues] = useState({
        workTitle: "",
        workDescription: "",
        workType: "",
        workDate: "",
        workTime: "",
        workersNeeded: "",
    });

    const [focused, setFocused] = useState({
        workTitle: false,
        workDescription: false,
        workType: false,
        workDate: false,
        workTime: false,
        workersNeeded: false,
    });

    // It is used to change the state of focused to true when the input is focused
    const handleFocus = (e, isFocused) => {
       setFocused((prevFocused) => ({ ...prevFocused, [e]: isFocused }));
    };

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

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const inputs = [
        {
            name: "workTitle",
            type: "text",
            placeholder: "Titulo del trabajo",
            errormessage: "Titulo del trabajo no debe incluir caracteres especiales.",
            label: "Titulo del trabajo",
            required: true,
            pattern: "[a-zA-Z]$",
        },
        {
            name: "workDescription",
            type: "text",
            placeholder: "Descripción del trabajo",
            errormessage: "Descripción del trabajo no debe incluir caracteres especiales.",
            label: "Descripción del trabajo",
            required: true,
            pattern: "[a-zA-Z]$",
        },
        {
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
        {
            name: "workDate",
            type: "date",
            placeholder: "Fecha del trabajo",
            errormessage: "Debe seleccionar una fecha.",
            label: "Fecha del trabajo",
            required: true,
        },
        {
            name: "workTime",
            type: "time",
            placeholder: "Hora del trabajo",
            errormessage: "Debe seleccionar una hora.",
            label: "Hora del trabajo",
            required: true,
        },
        {
            name: "workersNeeded",
            type: "number",
            placeholder: "Cantidad de voluntarios necesarios",
            errormessage: "Debe ingresar una cantidad de voluntarios necesarios.",
            label: "Cantidad de voluntarios necesarios",
            required: true,
            min: 1,
            max: 100,
        },
    ];

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            flex={4}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
            <h1>Crear Trabajo Voluntario</h1>

            {inputs.map((input) => {
                // Only render the workDate input if the workType is "Una sesión"
                if (input.name === "workDate" && values.workType !== "2") {
                    return null;
                }

                return (
                    <div key={input.name} className="workCreationForm">
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

                    />

                    }
                    {focused[input.name] && <span>{input.errormessage}</span>}
                </div>

                )

            })}
            <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '50px', alignSelf: 'center'}}
            >
                Crear
            </Button>

        </Box>
    )
}
