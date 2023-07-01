import React, { useState, useEffect } from "react";
import { Box, Dialog, DialogTitle, DialogContent } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import axios from "axios";
import Cookies from "js-cookie";
import HourSelect from "../HourSelect";
import TagSelect from "../TagSelect";
import Calendar from "../Calendar";
import CalendarLegend from "../CalendarLegend";
import { sortWorksByTag } from "../Utils/sortWorksByTag";
import { days, monthNames } from "../Utils/calendarConstants";

export default function CalendarVolunteer({ setIsLoggedIn }) {
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

  // Function to show the works in the calendar
  const isWorkOnDay = (work, day, selectedHour) => {
    // Add 1 day to the end date and the start date because the date-fns library
    const dateInit = addDays(new Date(work.dateInit), 1);
    const dateEnd = addDays(new Date(work.dateEnd), 1);

    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);

    // Get the name in Spanish of the day
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

    // Check if the work has a block that matches the day
    const hasBlock = work.blocks.some(
      (block) =>
        block.day &&
        block.day.toLowerCase() === dayName &&
        (selectedHour === null || block.hour === selectedHour)
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

  // To select one hour preference of the volunteer and show the works that match with the preference
  const [hours, setHours] = useState([]);
  const [userPrefHour, setUserPrefHour] = useState(null);
  const handleHourChange = (e) => {
    setUserPrefHour(e.target.value === "" ? null : e.target.value);
  };

  // To select one tag of the volunteer and show the works that match with it
  const [userTags, setUserTags] = useState([]);
  const [userPrefTag, setUserPrefTag] = useState([]);
  const handleTagChange = (e) => {
    const {
      target: { value },
    } = e;
    setUserPrefTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/volunteer/profile`, { headers })
      .then((response) => {
        const block = response.data.profile.blocks;
        const userTag = response.data.profile.tags;
        setHours(block);
        setUserTags(userTag);
      })
      .catch((error) => {
        console.error(error.response.data.message);
      });
  }, []);

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
      {/* To filter the works by hour preference or order them by tags */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "150px",
          }}
        >
          <label>
            <h3 style={{ color: "rgb(127, 145, 248)" }}>Filtrar por</h3>
          </label>
          <HourSelect
            hours={hours}
            userPrefHour={userPrefHour}
            handleHourChange={handleHourChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "auto",
            marginRight: "80px",
          }}
        >
          <label>
            <h3 style={{ color: "rgb(127, 145, 248)" }}>Ordenar por</h3>
          </label>
          <TagSelect
            userTags={userTags}
            userPrefTag={userPrefTag}
            handleTagChange={handleTagChange}
          />
        </Box>

        <CalendarLegend />
      </Box>

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
        sortWorksByTag={sortWorksByTag}
        userPrefHour={userPrefHour}
        userPrefTag={userPrefTag}
        handleWorkClick={handleWorkClick}
      />

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
    </Box>
  );
}
