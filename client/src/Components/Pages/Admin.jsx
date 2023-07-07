import "../dashboard.css";
import Cookies from "js-cookie";
import Sidebar from "../Sidebar";
import { Box, Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/UserContext";

export default function Admin() {
  const { profile } = useContext(UserContext);
  // protect routes
  if (profile?.rol != "admin") {
    return <Navigate to={"/"} replace />;
  }

  return (
    <Box className="boxWorkForm">
      <Stack direction="row" spacing={2} justifyContent="space-between">
        {/** <Sidebar /> this must be the admin sidebar */}
        <Outlet />
      </Stack>
    </Box>
  );
}
