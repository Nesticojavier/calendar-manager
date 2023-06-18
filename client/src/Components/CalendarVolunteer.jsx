import React, { useState, useEffect } from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function CalendarVolunteer({ setIsLoggedIn }) {
  const navigate = useNavigate();

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
    "Setiembre",
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

  const handleAddWorks = (currentYear, currentMonth) => {
    axios
      .get(
        `http://localhost:3000/volunteer/jobs/${currentYear}/${
          currentMonth + 1
        }`,
        { headers }
      )
      .then((response) => {
        // console.log("jijijaja");
        // console.log(currentMonth+1);
        // console.log(currentYear);
        // console.log(response.data);
        setWorkData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data.message);
        } else {
          console.error(error.message);
        }
      });
  };

  useEffect(() => {
    handleAddWorks(currentYear, currentMonth);
  }, [currentYear, currentMonth]);

  // to show the works tags in the calendar
  const isWorkOnDay = (work, day) => {
    // console.log("--------------------");
    // console.log("inicio de la función");
    // console.log(currentMonth+1)
    // console.log(work)

    // Add 1 day to the end date and the start date because the date-fns library
    const dateInit = addDays(new Date(work.dateInit), 1);
    const dateEnd = addDays(new Date(work.dateEnd), 1);

    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);

    // Get the name in Spanish of the day
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

    // Check if the work has a block that matches the day
    const hasBlock = work.blocks.some(
      (block) => block.day.toLowerCase() === dayName
    );
    // console.log(hasBlock);

    // Check if the work is within the start and end range
    const isInRange =
      (date >= dateInit && date <= dateEnd) ||
      isSameDay(date, dateInit) ||
      isSameDay(date, dateEnd);
    // console.log(isInRange);
    // console.log("fin de la función");

    // Return true if both conditions are true, and false otherwise
    return hasBlock && isInRange;
  };

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleGridItemClick = (event) => {
    setDialogOpen(true);
    setSelectedDay(event.target.textContent);
  };

  const handleDialogClose = (event) => {
    setDialogOpen(false);
  };

  console.log(workData);
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
            // console.log(`Result: ${result}`);
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
                    }}
                  >
                    {work.title}
                  </span>
                ))}
              </div>
            </Grid>
          );
        })}

        {/* <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Bloques de horarios</DialogTitle>
          <DialogContent>
            <div>
              {selectedDay && (
                <Grid
                  container
                  spacing={4}
                  sx={{
                    margin: "auto",
                    maxWidth: "100%",
                    "--Grid-borderWidth": "1px",
                    borderTop: "var(--Grid-borderWidth) solid",
                    borderLeft: "var(--Grid-borderWidth) solid",
                    borderColor: "black",
                    "& > div": {
                      borderRight: "var(--Grid-borderWidth) solid",
                      borderBottom: "var(--Grid-borderWidth) solid",
                      borderColor: "black",
                      overflow: "hidden",
                    },
                  }}
                >
                  {hours.map((hour) => (
                    <Grid key={hour} item xs={12} minHeight={50}>
                      <h3 style={{ fontSize: 12 }}>{hour}</h3>
                    </Grid>
                  ))}
                </Grid>
              )}
            </div>
          </DialogContent>
        </Dialog> */}
      </Grid>
    </Box>
  );
}
