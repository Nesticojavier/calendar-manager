import React, { useState, useEffect } from "react";
import '../dashboard.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import Sidebar from '../Sidebar';
import WorkCreationForm from '../WorkCreationForm';
import { Box, Stack } from '@mui/material';
import { Navigate } from 'react-router-dom'

export default function WorkCreation({ setIsLoggedIn }) {
    const token = Cookies.get('token');
    const headers = { Authorization: `Bearer ${token}` };
    const [user, setUser] = useState("");

    if (!token) {
        return <Navigate to={"/login"} replace />;
    }

    useEffect(() => {

        axios.get("http://localhost:3000/dashboard", { headers })
        .then((response) => {
            // Handle request response successful
            setUser(response.data);
        })
        .catch((error) => {
            // Handle request error
            console.error(error.response.data.message);
        });
    }, []); // Empty dependency so that the effect is executed only once when mounting the component

    return (
        <Box className='boxWorkForm'>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <WorkCreationForm />
        </Stack>
        </Box>

    );

}
