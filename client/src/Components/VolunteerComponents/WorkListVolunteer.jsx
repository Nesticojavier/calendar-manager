import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";

import "./volunteer.css";
import ConfirmedListWorkVolunter from "./ConfirmedListWorkVolunter";
import WorkStatusNavbar from "../WorkStatusNavbar";

export default function WorkListVolunteer() {
  // state for status verify work
  const [statusConfirmed, setStatusConfirmed] = useState(true);

  //state for set current page in the pagination
  const [currentPage, setCurrentPage] = useState(1);

  // handle for change status for to show
  const handleChangeStatus = (value) => {
    setStatusConfirmed(value);
  };

  // handle for change page number page value
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // When change status view, the page number should be reset to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [statusConfirmed]);

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

      <ConfirmedListWorkVolunter
        currentPage={currentPage}
        statusConfirmed={statusConfirmed}
        handlePageChange={handlePageChange}
      />

      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          onChange={handlePageChange}
          page={currentPage}
          count={10}
          variant="outlined"
          color="primary"
        />
      </Box>
    </Box>
  );
}
