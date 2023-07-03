import React from "react";
import { Box } from "@mui/material";

export default function CalendarLegend() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginLeft: "auto",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            width: "16px",
            height: "16px",
            backgroundColor: "lightgreen",
            borderRadius: "50%",
            marginRight: "15px",
            marginBottom: "10px",
          }}
        />
        <span
          style={{
            marginRight: "80px",
            marginBottom: "10px",
          }}
        >
          Trabajo por sesión
        </span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <span
          style={{
            display: "inline-block",
            width: "16px",
            height: "16px",
            backgroundColor: "lightblue",
            borderRadius: "50%",
            marginRight: "15px",
          }}
        />
        <span style={{ marginRight: "80px" }}>Trabajo recurrente</span>
      </div>
    </Box>
  );
}
