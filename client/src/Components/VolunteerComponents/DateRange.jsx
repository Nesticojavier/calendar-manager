import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./dateRange.css";

export default function DateRange({ onChange, minDate, maxDate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onChange([date, endDate]);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onChange([startDate, date]);
  };

  return (
    <div style={{ display: "flex"}}>
      <div >
        <label htmlFor="start-date">
          <strong>Fecha de inicio:</strong>
        </label>
        <br />
        <DatePicker
          id="start-date"
          selected={startDate}
          onChange={handleStartDateChange}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={minDate}
          placeholderText="Seleccione una fecha"
          className="date-picker-input"
        />
      </div>
      <div>
        <label htmlFor="end-date">
          <strong>Fecha de fin:</strong>
        </label>
        <br />
        <DatePicker
          id="end-date"
          selected={endDate}
          onChange={handleEndDateChange}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
          maxDate={maxDate}
          placeholderText="Seleccione una fecha"
          className="date-picker-input"
        />
      </div>
    </div>
  );
}
