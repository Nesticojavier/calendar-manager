import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import Calendar from "../Calendar";
import CalendarLegend from "../CalendarLegend";
import { days, monthNames } from "../Utils/calendarConstants";
import { providerService } from "../../Services/Api/providerService";
import WorkModalProvider from "./WorkModalProvider";

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

  useEffect(() => {
    providerService
    .getJobs()
    .then((workList) => {
      setWorkData(workList);
    })
    .catch((error) => {
      console.error(error);
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleWorkClick = (work) => {
    setModalOpen(true);
    setSelectedWork(work);
  };

  const handleModalClose = (event) => {
    setModalOpen(false);
  };

  return (
    <Box
      flex={7}
      p={2}
      px={8}
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

      {/* To display the modal with the work information */}
      <WorkModalProvider
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        selectedWork={selectedWork}
      />

    </Box>
  );
}
