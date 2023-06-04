import React, { useState, useEffect } from "react"
import { Box, Button } from '@mui/material'
import axios from 'axios';
import "./WorkCreationForm.css"
import Cookies from 'js-cookie';

export default function WorkCreationForm() {
    const [values, setValues] = useState({
        workTitle: "",
        workDescription: "",
        workType: "",
        workDate: "",
        startDate: "",
        endDate: "",
        workersNeeded: "",
    });

    const [focused, setFocused] = useState({
        workTitle: false,
        workDescription: false,
        workType: false,
        workDate: false,
        workersNeeded: false,
    });

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

    const handleSubmit = (event) => {
        event.preventDefault();

        // show error message if blocks variable is void
        if (blocks.length === 0) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1000);
        } else {
            // get token from cookies
            const token = Cookies.get('token');
            // construct object representing an HTTP authorization header with the Bearer scheme.
            const headers = { Authorization: `Bearer ${token}` };
            const valuesEnd = { ...values, blocks }
            console.log(valuesEnd);
            axios
                .post("http://localhost:3000/provider/create", valuesEnd, { headers })
                .then((response) => {
                    // Handle request response successful
                    swal({
                        title: "Trabajo creado exitosamente",
                        icon: "success",
                    }).then(() => {
                        window.location.reload();
                    })
                })
                .catch((error) => {
                    // Handle request error
                    console.error(error.response.data.message);
                });
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
            pattern: "[a-zA-Z ]{1,200}$",
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
        }
    ];

    // state used to set the blocks of hours
    const [blocks, setBlocks] = useState([]);


    // this is used to increase the number of blocks
    const handleMore = (e) => {
        setBlocks([...blocks, { day: "", hour: "" }]);
    }

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

    // To display the error message for blocks
    const [showError, setShowError] = useState(false);

    // To display the error message for start and end dates
    const [showErrorDate, setShowErrorDate] = useState(false);

    // To display the error message for tags
    const [showErrorTags, setShowErrorTags] = useState(false);

    // To add tags
    const [tagValue, setTagValue] = useState("");

    const [workTags, setTags] = useState([]);

    // When enter is pressed, the tag is added
    const addTags = (e) => {
        if (e.keyCode === 13 && tagValue){

            // Split the tag value into an array of words
            const words = tagValue.split(" ");

            // Check if the number of words is less than or equal to 2
            if (words.length <= 2){

                // Check if the length of the tagValue is less than or equal to 16
                if (tagValue.length <= 16){

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
            flex={4}
            p={2}
            className="workForm"
            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
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
                                <div className="workRecurrent">
                                    {blocks.map((block, blockIndex) => {
                                        return (
                                            <div key={blockIndex}>
                                                <p>Seleccione el bloque {blockIndex + 1}</p>
                                                <div className="selectDay">
                                                    <label htmlFor="" >Dia</label>
                                                    <select
                                                        required
                                                        name="day"
                                                        value={block.day}
                                                        onChange={(e) => handleBlockChange(blockIndex, e)} id=""
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

                                    <div className="startDate">
                                        <label htmlFor="" >Fecha de inicio</label>
                                        <input
                                            name={"startDate"}
                                            type={"date"}
                                            placeholder="Fecha de inicio"
                                            label={"Fecha de inicio"}
                                            required={true}

                                            // Ensures that the state always reflects the current value of the input
                                            // and stays in sync with changes made by the user
                                            onChange={handleChange}

                                            // To display the error message when the input is focused
                                            // set to true to keep the error message as long as the input is invalid
                                            onBlur={() => handleFocus("startDate", true)}
                                        >
                                        </input>

                                        <label htmlFor="" >Fecha de culminación</label>
                                        <input
                                            name={"endDate"}
                                            type={"date"}
                                            placeholder="Fecha de culminación"
                                            label={"Fecha de culminación"}
                                            required={true}

                                            // Ensures that the state always reflects the current value of the input
                                            // and stays in sync with changes made by the user
                                            onChange={handleChange}

                                            // To display the error message when the input is focused
                                            // set to true to keep the error message as long as the input is invalid
                                            onBlur={() => handleFocus("endDate", true)}
                                        >
                                        </input>

                                        {showErrorDate &&
                                        <span>La fecha de culminacion debe ser después que la de inicio.</span>}
                                    </div>
                                </div>

                            ) : (
                                // if is selected work by session
                                <div className="workBySession">
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

                                    <label htmlFor="">Hora</label>
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

            {/*Part of workTags*/}
            <label className="labelTag" htmlFor="workTags-input">Ingrese los Tags</label>
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
                        if (e.key === 'Enter'){
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

            <Button
                type="submit"
                variant="contained"
                sx={{ marginTop: '20px',
                    alignSelf: 'center',
                    background: '#a04af1',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    fontSize: '18px'}}
            >
                Crear
            </Button>

        </Box>
    )
}
