import React, { useState } from "react";
import { Box, Grid, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getDaysInMonth } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";

export default function Calendar({ setIsLoggedIn }) {
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

  // hours for the work
  const hours = [
    "7:00 am",
    "8:00 am",
    "9:00 am",
    "10:00 am",
    "11:00 am",
    "12:00 pm",
    "1:00 pm",
    "2:00 pm",
    "3:00 pm",
    "4:00 pm",
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

  // to know the day that is being selected
  const [selectedDay, setSelectedDay] = useState(null);

  // to know the month that is being selected
  const [selectedMonth, setSelectedMonth] = useState(null);

  // to know the year that is being selected
  const [selectedYear, setSelectedYear] = useState(null);

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

  // Function to handle adding a new work item from the form
  const handleAddWorkItem = (workItem) => {
    setWorkItems([...workItems, workItem]);
  };

  //   const [dialogOpen, setDialogOpen] = useState(false);

  //   const handleGridItemClick = (event) => {
  //     setDialogOpen(true);
  //     setSelectedDay(event.target.textContent);
  //   };

  //   const handleDialogClose = (event) => {
  //     setDialogOpen(false);
  //   };

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
          {" "}
          {monthNames[currentMonth]} {currentYear}{" "}
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
          margin: "0",
          minWidth: "100%",
          "--Grid-borderWidth": "2px",
          borderTop: "var(--Grid-borderWidth) solid",
          borderLeft: "var(--Grid-borderWidth) solid",
          borderColor: "black",
          "& > div": {
            borderRight: "var(--Grid-borderWidth) solid",
            borderBottom: "var(--Grid-borderWidth) solid",
            borderColor: "black",
          },
        }}
      >
        {/* Map over workItems and render a label for each item on the corresponding day in the calendar */}
        {/* {workItems.map((workItem) => {
          // Check if the work item is in the current month and year
          if (
            workItem.date.getMonth() === currentMonth &&
            workItem.date.getFullYear() === currentYear
          ) {
            // Render a label for the work item on the corresponding day in the calendar
            // return <div>{/* Render label for workItem here */}
        {/* </div>; */}
        {/* }
          return null;
        })}  */}
        {/* To display the days of the week */}
        {days.map((day) => (
          <Grid
            key={day}
            item
            xs={1.7144}
            minHeight={70}
            sx={{ display: "flex" }}
          >
            <h3 style={{ margin: 0 }}>{day}</h3>
          </Grid>
        ))}

        {/* To display the first day of the month on the corresponding day of the week */}
        {[...Array(firstDay)].map((_, index) => (
          <Grid key={index} item xs={1.7144} minHeight={100} />
        ))}

        {/* To display the days of the month */}
        {[...Array(daysInMonth)].map((_, index) => {
          // to know if the day is sunday
          const date = new Date(currentYear, currentMonth, index + 1);
          const isSunday = date.getDay() === 0;
          // to handle the click on the day
          const handleIconClick = (e) => {
            setSelectedDay(index + 1);
            setSelectedMonth(currentMonth);
            setSelectedYear(currentYear);
            navigate(`/provider/workcreation`);
          };
          // Add a condition to check if a tag should be added to this day
          const isMondayOrWednesday =
            date.getDay() === 1 || date.getDay() === 3;
          const isWithinDateRange =
            date >= new Date(currentYear, 5, 5) &&
            date <= new Date(currentYear, 5, 28);
          const shouldAddTag = isMondayOrWednesday && isWithinDateRange;
          const tags = shouldAddTag ? ["Trabajo1", "Trabajo2", "Trabajo 3", "Habia una vez pepito", "Yo no se", "Otro trabajo", "OTROO"] : [];
          return (
            <Grid
              key={index}
              item
              xs={1.7144}
              minHeight={100}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
              //   onClick={!isSunday ? handleGridItemClick : undefined}
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
                {tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      display: "inline-block",
                      padding: "2px 6px",
                      backgroundColor: "lightblue",
                      borderRadius: "4px",
                      fontSize: "12px",
                      margin: "2px",
                    }}
                  >
                    {tag}
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
