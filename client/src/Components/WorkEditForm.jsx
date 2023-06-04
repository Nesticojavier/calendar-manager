import React, { useState, useEffect } from "react"
import { Box, Button } from '@mui/material'
import axios from 'axios';
import "./WorkCreationForm.css"
import Cookies from 'js-cookie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


export default function WorkCreationForm() {

    const location = useLocation();
    const { work } = location.state;
    const { id: workId } = useParams();
    const workBlocks = JSON.parse(work.blocks)
    const navigate = useNavigate();


    const [values, setValues] = useState({
        workTitle: work.title,
        workDescription: work.description,
        workType: work.type,
        workersNeeded: work.volunteerCountMax
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
                .put(`http://localhost:3000/provider/job/${workId}`,valuesEnd, { headers })
                .then((response) => {
                    // Handle request response successful
                    swal({
                        title: "Trabajo actualizado exitosamente",
                        icon: "success",
                    }).then(() => {
                        navigate(`/WorkList`);
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

    const handleCancel = (e) => {
        navigate(`/WorkList`);
    }

    useEffect(() => {
        // when swicht to session mode
        if (values.workType === "2") {
            setBlocks(workBlocks);
        } else if (values.workType === "1") {
            setBlocks(workBlocks)
        }
    }, [values.workType]);

    const [showError, setShowError] = useState(false);

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            flex={4}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
        >
            <h1>Editar Trabajo de {work.title}</h1>

            {
                inputs.map((input) => {
                    return (
                        <div key={input.name} className="workCreationForm">
                            <label htmlFor={input.id}>{input.label}</label>

                            {input.type === "select"
                                ?
                                <select value={values[input.name]} name={input.name} id={input.id} onChange={handleChangeSelect}>
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
                                        value={blocks[0]?.day}

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

            <div style={{ display: 'flex', marginTop: '80px', marginLeft: '10px' }} >
                <Button
                    type="button"
                    variant="contained" color="error"
                    sx={{ marignLeft: '10px', marginRight: '30px' }}
                    onClick={handleCancel}
                >
                    Cancelar
                </Button>
                <Button
                    type="submit"
                    variant="contained"
                >
                    Actualizar
                </Button>

            </div>


        </Box>
    )
}
