import { Box } from "@mui/material";
import React from "react";


export default function Calendar({ setIsLoggedIn }) {

    return (
        <Box
            flex={4}
            p={2}
            sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}
        >
            <h1> Calendario del Proveedor </h1>
            <p> Aqui se mostrara el calendario del proveedor </p>

        </Box>

    );

}
