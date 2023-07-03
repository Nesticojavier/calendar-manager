import { useEffect, useState } from "react";
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
      px={40}
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

      <ConfirmedListWorkProvider statusConfirmed={statusConfirmed} />
    </Box>
  );
}
