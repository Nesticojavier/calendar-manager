import React from "react";
import { Tabs, Tab, Box } from "@mui/material";

export default function WorkStatusNavbar({
  statusConfirmed,
  handleChangeStatus,
}) {

  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
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
  );
}
