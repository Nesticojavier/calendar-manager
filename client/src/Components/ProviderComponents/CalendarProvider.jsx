import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogTitle, DialogContent, Divider } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import axios from "axios";
import Cookies from "js-cookie";
import Calendar from "../Calendar";
import CalendarLegend from "../CalendarLegend";
import { days, monthNames } from "../Utils/calendarConstants";

export default function CalendarProvider({ setIsLoggedIn }) {
  // to know the current month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // to know the current year
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // to know the days in the current month
  const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));

  // to know the first day of the month
  const firstDay = new Date(currentYear, currentMonth).getDay();

  // to change to the previuos month
  const handlePrevMonthClick = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // to change to the next month
  const handleNextMonthClick = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // to get the work data
  const [workData, setWorkData] = useState([]);
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/provider/myjobs/`, { headers })
      .then((response) => {
        setWorkData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
        } else {
          console.error(error.message);
        }
      });
  }, []);

  // to show the works tags in the calendar
  const isWorkOnDay = (work, day) => {
    // Add 1 day to the end date and the start date because the date-fns library
    const dateInit = addDays(new Date(work.dateInit), 1);
    const dateEnd = addDays(new Date(work.dateEnd), 1);

    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);

    // Get the name in Spanish of the day
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

    // Check if the work has a block that matches the day
    const hasBlock = work.blocks.some(
      (block) => block.day && block.day.toLowerCase() === dayName
    );

    // Check if the work is within the start and end range
    const isInRange =
      (date >= dateInit && date <= dateEnd) ||
      isSameDay(date, dateInit) ||
      isSameDay(date, dateEnd);

    // Return true if both conditions are true, and false otherwise
    return hasBlock && isInRange;
  };

  // to show a dialog with the work information
  const [selectedWork, setSelectedWork] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWorkClick = (work) => {
    setDialogOpen(true);
    setSelectedWork(work);
  };

  const handleDialogClose = (event) => {
    setDialogOpen(false);
  };

  return (
    <Box
      flex={7}
      p={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "auto",
        minWidth: "auto",
        overflow: "auto",
      }}
    >
      {/* To display the calendar legend */}
      <CalendarLegend />

      {/* To display the calendar */}
      <Calendar
        days={days}
        monthNames={monthNames}
        currentMonth={currentMonth}
        currentYear={currentYear}
        handlePrevMonthClick={handlePrevMonthClick}
        handleNextMonthClick={handleNextMonthClick}
        firstDay={firstDay}
        daysInMonth={daysInMonth}
        workData={workData}
        isWorkOnDay={isWorkOnDay}
        handleWorkClick={handleWorkClick}
      />

      {/* To display the dialog with the work information */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <strong>Información del trabajo</strong>
        </DialogTitle>

        <DialogContent>
          {selectedWork && (
            <Box>
              <Box sx={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Título:</strong> {selectedWork.title}
                </p>
                <Divider
                  sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Descripción:</strong> {selectedWork.description}
                </p>
                <Divider
                  sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Tipo:</strong>{" "}
                  {`Trabajo ${
                    selectedWork.type === 1 ? "recurrente" : "de sesión"
                  }`}
                </p>
                <Divider
                  sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <p>
                  <strong>Fecha de inicio:</strong> {selectedWork.dateInit}
                </p>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Fecha de fin:</strong> {selectedWork.dateEnd}
                </p>
                <Divider
                  sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
                />
              </Box>
              <Box sx={{ marginBottom: "20px" }}>
                <p style={{ marginBottom: "10px" }}>
                  <strong>Bloques:</strong>
                </p>
                <ul>
                  {selectedWork.blocks.map((block) => (
                    <div key={block.id}>
                      <p>
                        <strong>Día:</strong> {block.day}
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Hora:</strong> {block.hour}
                      </p>
                    </div>
                  ))}
                </ul>
                <Divider
                  sx={{ borderBottom: "1px solid gray", margin: "10px 0" }}
                />
              </Box>

              <p style={{ marginBottom: "10px" }}>
                <strong>Etiquetas:</strong>
              </p>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {selectedWork.tags.map((tag) => (
                  <Box
                    key={tag}
                    sx={{
                      border: "1px solid gray",
                      borderRadius: "20px",
                      padding: "5px 10px",
                      backgroundColor: "lightgray",
                    }}
                  >
                    {tag}
                  </Box>
                ))}
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
