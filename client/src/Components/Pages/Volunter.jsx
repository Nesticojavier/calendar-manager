import '../dashboard.css';
import Cookies from 'js-cookie';
import Sidebar from '../Sidebar';
import { Box, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom'

export default function Provider({ setIsLoggedIn }) {
    // const token = Cookies.get('token');

    // if (!token) {    
    //     return <Navigate to={"/login"} replace />;
    // }

    return (
        <Box className='boxWorkForm'>
        <Stack direction="row" spacing={2} justifyContent="space-between">
            <Sidebar /> {/** this must be the volunter's sidebar */}
            <Outlet/>
        </Stack>
        </Box>

    );

}
