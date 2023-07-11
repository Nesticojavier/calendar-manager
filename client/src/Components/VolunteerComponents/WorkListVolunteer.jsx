import { useState, useEffect } from "react";
import { Box } from "@mui/material";
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
      px={15}
      sx={{
        display: "flex",
        flexDirection: "column",
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
