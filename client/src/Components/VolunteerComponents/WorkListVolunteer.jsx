import { useState } from "react";
import { Box } from "@mui/material";

import "./volunteer.css";
import ConfirmedListWorkVolunter from "./ConfirmedListWorkVolunter";
import WorkStatusNavbar from "../WorkStatusNavbar";

export default function WorkListVolunteer() {
  // state for status verify work
  const [statusConfirmed, setStatusConfirmed] = useState(true);

  // handle for change status for to show
  const handleChangeStatus = (value) => {
    setStatusConfirmed(value);
  };

  return (
    <Box
      flex={7}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        overflow: "auto",
      }}
    >
      <WorkStatusNavbar
        statusConfirmed={statusConfirmed}
        handleChangeStatus={handleChangeStatus}
      />

      <ConfirmedListWorkVolunter statusConfirmed={statusConfirmed} />
    </Box>
  );
}
