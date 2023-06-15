import '../dashboard.css';
import SidebarVolunteer from '../SidebarVolunteer';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom'

export default function Volunter({ isAllowed }) {
    if (!isAllowed) {
        return <Navigate to={"/"} replace />;
    }

    return (
        <Box className='boxWorkForm'>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <SidebarVolunteer /> {/** this must be the volunter sidebar */}
            <Outlet/>
        </Stack>
        </Box>

    );

}
