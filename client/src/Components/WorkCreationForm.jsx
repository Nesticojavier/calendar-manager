import React, { useState, useEffect } from "react"
import { Box, Button } from '@mui/material'
import "./WorkCreationForm.css"

export default function WorkCreationForm() {
    const [values, setValues] = useState({
        workTitle: "",
        workDescription: "",
        workType: "",
        workDate: "",
        workTime: "",
        workersNeeded: ""
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
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const handleChangeSelect = (event) => {
        const { name, value } = event.target;
        setValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // show error message if blocks va?riable is void
        if (blocks.length === 0) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        } else {
            const valuesEnd = { ...values, blocks }
            console.log(valuesEnd);
        }

    }

    const inputs = [
        {
            id: 1,
            name: "workTitle",
            type: "text",
            placeholder: "Titulo del trabajo",
            errormessage: "Titulo del trabajo no debe incluir caracteres especiales.",
            label: "Titulo del trabajo",
            required: true,
            pattern: "[a-zA-Z ]{1,64}$",
        },
        {
            id: 2,
            name: "workDescription",
            type: "text",
            placeholder: "Descripción del trabajo",
            errormessage: "Descripción del trabajo no debe incluir caracteres especiales.",
            label: "Descripción del trabajo",
            required: true,
            pattern: "[a-zA-Z ]{1,64}$",
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
        // {
        //     name: "workDate",
        //     type: "date",
        //     placeholder: "Fecha del trabajo",
        //     errormessage: "Debe seleccionar una fecha.",
        //     label: "Fecha del trabajo",
        //     required: true,
        // },
        // {
        //     name: "workTime",
        //     type: "time",
        //     placeholder: "Hora del trabajo",
        //     errormessage: "Debe seleccionar una hora.",
        //     label: "Hora del trabajo",
        //     required: true,
        // },
    ];

    // state used to set the blocks of hours
    const [blocks, setBlocks] = useState([]);


    // this is used to increase the number of blocks
    const handleMore = (e) => {
        setBlocks([...blocks, { day: "", hour: "" }]);
    }

    // blocks of hours and days
    const days = ["Lun", "Mar", "Mie", "Jue", "Vie"];
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
        "4:00 PM"
    ];

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
        const { value } = e.target
        setBlocks((prevBlocks) => {
            const updatedBlocks = [...prevBlocks];
            updatedBlocks[0].day = value;
            return updatedBlocks;
        });
    }

    const handleChangeSessionHour = (e) => {
        const { value } = e.target
        setBlocks((prevBlocks) => {
            const updatedBlocks = [...prevBlocks];
            updatedBlocks[0].hour = value;
            return updatedBlocks;
        });
    }

    useEffect(() => {
        // when swicht to session mode
        if (values.workType === "2") {
            setBlocks([{ day: "", hour: "" }]);
        } else if (values.workType === "1") {
            setBlocks([])
            setValues((prevValues) => ({
                ...prevValues,
                workDate: ""
            }));
        }
    }, [values.workType]);

    const [showError, setShowError] = useState(false);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            flex={4}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}
        >
            <h1>Crear Trabajo Voluntario</h1>

            {
                inputs.map((input) => {
                    return (
                        <div key={input.name} className="workCreationForm">
                            <label htmlFor={input.id}>{input.label}</label>

                            {input.type === "select"
                                ?
                                <select name={input.name} id={input.id} onChange={handleChangeSelect}>
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
                                    onChange={handleChange}

                                    // The value of the input is bound to the value stored in values[input.name]
                                    value={values[input.name]}

                                    // To display the error message when the input is focused
                                    // set to true to keep the error message as long as the input is invalid
                                    onBlur={() => handleFocus(input.name, true)}

                                />
                            }
                            {focused[input.name] && <span>{input.errormessage}</span>}
                        </div>
                    )
                })
            }
            {  
                values.workType == "1" || values.workType == "2"
                    ? (
                        // if is selected the work by recurrent
                        values.workType == "1"
                            ? (
                                <div>
                                    {blocks.map((block, blockIndex) => {
                                        return (
                                            <div key={blockIndex}>
                                                <p>Seleccione el bloque {blockIndex + 1}</p>

                                                <label htmlFor="" >Dia</label>
                                                <select required name="day" value={block.day} onChange={(e) => handleBlockChange(blockIndex, e)} id="">
                                                    <option value="">Seleccione un día</option>
                                                    {days.map((day) => (
                                                        <option key={day} value={day}>
                                                            {day}
                                                        </option>
                                                    ))}
                                                </select>

                                                <label htmlFor="" >Hora</label>
                                                <select required name="hour" value={block.hour} onChange={(e) => handleBlockChange(blockIndex, e)} id="">
                                                    <option value="">Seleccione una hora</option>
                                                    {hours.map((hour) => (
                                                        <option key={hour} value={hour}>
                                                            {hour}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
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
                                </div>

                            ) : (
                                // if is selected work by session
                                <div className="workCreationForm">
                                    <label htmlFor={5}>Seleccione la fecha del trabajo </label>
                                    <input
                                        name={"workDate"}
                                        type={"date"}
                                        placeholder={"Fecha del trabajo"}
                                        label={"Fecha del trabajo"}
                                        required={true}

                                        // Ensures that the state always reflects the current value of the input
                                        // and stays in sync with changes made by the user
                                        onChange={handleChangeSessionDay}

                                        // The value of the input is bound to the value stored in values[input.name]
                                        // value={values["workDate"]}

                                        // To display the error message when the input is focused
                                        // set to true to keep the error message as long as the input is invalid
                                        onBlur={() => handleFocus("workDate", true)}

                                    />
                                    {focused["workDate"] && <span>Debe seleccionar una fecha.</span>}
                                    
                                    <label htmlFor="" >Hora</label>
                                    <select required name="hour" value={blocks[0]?.hour} onChange={handleChangeSessionHour} id="">
                                        <option value="">Seleccione una hora</option>
                                        {hours.map((hour) => (
                                            <option key={hour} value={hour}>
                                                {hour}
                                            </option>
                                        ))}
                                    </select>

                                </div>
                            )
                    )
                    :
                    null
            }

            <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '50px', alignSelf: 'center' }}
            >
                Crear
            </Button>

        </Box>
    )
}
