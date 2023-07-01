import { UserContext } from "../Context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { Box } from "@mui/system";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
} from "@mui/material";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";

// export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
export default function Navbar() {
  const { isLoggedIn, changeLoggedIn, changeProfile, profile } =
    useContext(UserContext);

  //   console.log(profile.rol);
  const navigate = useNavigate();
  const handleClick = () => {
    Cookies.remove("token");
    changeLoggedIn(false);
    changeProfile(null);
    navigate("/", { replace: true });
  };

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <>
      <AppBar position="static">
        {!isLoggedIn ? (
          <Toolbar>
            <Typography component={"div"} sx={{ flexGrow: 1 }}>
              <Button
                onClick={() => navigateTo("/")}
                color="inherit"
                variant="text"
                startIcon={<CalendarMonthIcon />}
              >
                Inicio
              </Button>
            </Typography>

            <Box>
              <Button onClick={() => navigateTo("/login")} color="inherit">
                Iniciar sesion
              </Button>
              <Button onClick={() => navigateTo("/signup")} color="inherit">
                Registrarse
              </Button>
            </Box>
          </Toolbar>
        ) : (
          <Toolbar>
            <Typography component={"div"} sx={{ flexGrow: 1 }}>
              <Button
                color="inherit"
                variant="text"
                startIcon={<CalendarMonthIcon />}
              >
                Cuenta de {profile?.rol}
              </Button>
            </Typography>

            <Box>
              <Button
                onClick={handleClick}
                color="inherit"
                variant="text"
                endIcon={<LogoutIcon />}
              >
                Cerrar sesion
              </Button>
            </Box>
          </Toolbar>
        )}
      </AppBar>
    </>
  );
}
