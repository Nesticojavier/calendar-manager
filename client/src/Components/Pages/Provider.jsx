import '../dashboard.css';
import Sidebar from '../Sidebar';
import { Box, Stack } from '@mui/material';
import { Outlet, Navigate } from 'react-router-dom';

export default function Provider({ isAllowed }) {

    if (!isAllowed) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Box className='boxWorkForm'>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar />
            <Outlet/>
        </Stack>
        </Box>

    );

}
