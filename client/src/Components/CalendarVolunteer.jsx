import React, { useState, useEffect } from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import Cookies from "js-cookie";

export default function CalendarVolunteer({ setIsLoggedIn }) {
  // days of the week
  const days = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  // months of the year
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

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
      .get(`http://localhost:3000/volunteer/jobs/`, { headers })
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

  // const handleAddWorks = (currentYear, currentMonth) => {
  //   axios
  //     .get(
  //       `http://localhost:3000/volunteer/jobs/${currentYear}/${currentMonth+1}`,
  //       { headers }
  //     )
  //     .then((response) => {
  //       setWorkData(response.data);
  //     })
  //     .catch((error) => {
  //       if (error.response) {
  //         console.error(error.response.data.message);
  //       } else {
  //         console.error(error.message);
  //       }
  //     });
  // };

  // useEffect(() => {
  //   handleAddWorks(currentYear, currentMonth);
  // }, [currentYear, currentMonth]);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ArrowBackIosNewIcon
          sx={{ cursor: "pointer" }}
          onClick={handlePrevMonthClick}
        />
        <h1 style={{ color: "rgb(127, 145, 248)" }}>
          {monthNames[currentMonth]} {currentYear}
        </h1>
        <ArrowForwardIosIcon
          sx={{ cursor: "pointer" }}
          onClick={handleNextMonthClick}
        />
      </div>
      <Grid
        container
        spacing={2}
        sx={{
          margin: "0px",
          minWidth: "100%",
          "--Grid-borderWidth": "1px",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "black",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderTop: "var(--Grid-borderWidth) solid",
            borderColor: "black",
          },
        }}
      >
        {/* To display the days of the week */}
        {days.map((day) => (
          <Grid key={day} item xs={1.6} minHeight={70} sx={{ display: "flex" }}>
            <h3 style={{ margin: 0 }}>{day}</h3>
          </Grid>
        ))}

        {/* To display the first day of the month on the corresponding day of the week */}
        {[...Array(firstDay)].map((_, index) => (
          <Grid key={index} item xs={1.6} minHeight={100} />
        ))}

        {/* To display the days of the month */}
        {[...Array(daysInMonth)].map((_, index) => {
          // To check if a tag should be added to this day
          const worksOnDay = workData.filter((work) => {
            const result = isWorkOnDay(work, index + 1);
            return result;
          });

          return (
            <Grid
              key={index}
              item
              xs={1.6}
              minHeight={100}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div> {index + 1} </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {worksOnDay.map((work) => (
                  <span
                    key={work.id}
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      backgroundColor: "lightblue",
                      borderRadius: "4px",
                      fontSize: "12px",
                      margin: "2px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleWorkClick(work)}
                  >
                    {work.title}
                  </span>
                ))}
              </div>
            </Grid>
          );
        })}

        {/* To display the dialog with the work information */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Información del trabajo</DialogTitle>
          <DialogContent>
            {selectedWork && (
              <div>
                <p>Título: {selectedWork.title} </p>
                <p>Descripción: {selectedWork.description} </p>
                <p>
                  Tipo:{" "}
                  {`Trabajo ${
                    selectedWork.type === 1 ? "recurrente" : "de sesión"
                  }`}{" "}
                </p>
                <p>Fecha de inicio: {selectedWork.dateInit} </p>
                <p>Fecha de fin: {selectedWork.dateEnd} </p>
                <p>Bloques:</p>
                <ul>
                  {selectedWork.blocks.map((block) => (
                    <li key={block.id}>
                      <p>Dia: {block.day}</p>
                      <p>Hora: {block.hour}</p>
                    </li>
                  ))}
                </ul>
                <p>Etiquetas:</p>
                <ul>
                  {selectedWork.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Grid>
    </Box>
  );
}