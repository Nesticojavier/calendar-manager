import { useState } from "react";
import {
  Box,
} from "@mui/material";

import "./volunteer.css";
import ConfirmedListWorkVolunter from "./ConfirmedListWorkVolunter";


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
        minWidth: "100vh",
        overflow: "auto",
      }}
    >
      <div className="navStatus">
        <nav>
          <ul>
            <li
              className={statusConfirmed ? "active" : ""}
              onClick={() => {
                handleChangeStatus(true);
              }}
            >
              Confirmados
            </li>
            <li
              className={!statusConfirmed ? "active" : ""}
              onClick={() => {
                handleChangeStatus(false);
              }}
            >
              Por confirmar
            </li>
          </ul>
        </nav>
      </div>
      
      <ConfirmedListWorkVolunter statusConfirmed = {statusConfirmed} />
      
    </Box>
  );
}
