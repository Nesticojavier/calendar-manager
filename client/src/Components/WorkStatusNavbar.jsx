import React, { useState } from "react";
import { Tabs, Tab, Box, Button } from "@mui/material";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import GenerateReport from "./GenerateReport";
import { UserContext } from "../Context/UserContext";
import { useContext } from "react";

export default function WorkStatusNavbar({
  statusConfirmed,
  handleChangeStatus,
}) {

  // data to pass to the report generation window as props
  const { profile } = useContext(UserContext);
  const user_id = profile.id;
  const role = profile.rol

  // States used to crontrol the windows modal with volunteer info
  const [openGenerateReport, setOpenGenerateReport] = useState(false);

  //Open modal to generate report
  const handleOpenGenerateReport = (x) => {
    setOpenGenerateReport(true);
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", my: 2 }}>
      <Button
        onClick={() => handleOpenGenerateReport(2)}
        variant="outlined"
        endIcon={<AssessmentOutlinedIcon />}
      >
        Generar reporte
      </Button>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Tabs
          value={statusConfirmed ? "one" : "two"}
          onChange={(event, newValue) => {
            newValue === "one"
              ? handleChangeStatus(true)
              : handleChangeStatus(false);
          }}
          aria-label="secondary tabs example"
          sx={{ textTransform: "none" }}
        >
          <Tab value="one" label="Confirmados " />
          <Tab value="two" label="Por confirmar" />
        </Tabs>
      </Box>
      {openGenerateReport && (
        <GenerateReport
          handleClose={() => setOpenGenerateReport(false)}
          user_id={user_id}
          role={role}
        />
      )}
    </Box>
  );
}
