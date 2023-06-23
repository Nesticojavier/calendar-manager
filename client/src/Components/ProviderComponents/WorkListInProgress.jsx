import { useState } from "react";
import { Box } from "@mui/material";
import WorkStatusNavbar from "../WorkStatusNavbar";
import ConfirmedListWorkProvider from "./ConfirmedListWorkProvider";

export default function WorkListInProgress() {
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
        minWidth: "100vh",
        overflow: "auto",
      }}
    >
      <WorkStatusNavbar
        statusConfirmed={statusConfirmed}
        handleChangeStatus={handleChangeStatus}
      />

      <ConfirmedListWorkProvider statusConfirmed = {statusConfirmed} />
    </Box>
  );
}
