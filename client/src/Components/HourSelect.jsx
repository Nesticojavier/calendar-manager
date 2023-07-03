import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function HourSelect({ hours, userPrefHour, handleHourChange }) {
  return (
    <FormControl sx={{ m: 2, minWidth: 120, marginTop: "0px" }}>
      <InputLabel id="" style={{ margin: "auto" }}>
        Horas
      </InputLabel>
      <Select
        labelId=""
        id=""
        value={userPrefHour}
        label="Hour"
        onChange={handleHourChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {hours.map((hour, index) => (
          <MenuItem key={index} value={hour}>
            {hour}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
