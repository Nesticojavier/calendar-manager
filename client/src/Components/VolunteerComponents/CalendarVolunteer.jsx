import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays } from "date-fns";
import HourSelect from "../HourSelect";
import TagSelect from "../TagSelect";
import Calendar from "../Calendar";
import CalendarLegend from "../CalendarLegend";
import { sortWorksByTag } from "../Utils/sortWorksByTag";
import { days, monthNames } from "../Utils/calendarConstants";
import { volunteerService } from "../../Services/Api/volunteerService";
import Swal from "sweetalert2";
import "./CalendarVolunteer.css";
import WorkModalVolunteer from "./WorkModalVolunteer";

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

  useEffect(() => {
    volunteerService
      .getAllJobsateJob()
      .then((works) => {
        setWorkData(works);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

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
        (selectedHour === null ||
          selectedHour === "" ||
          block.hour === selectedHour)
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

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedWork(null);
  };

  const handlePostulation = (workId) => {
    volunteerService
      .postulate(workId, selectedDates)
      .then((response) => {
        // console.log(response);
        setModalOpen(false);
        showSimpleAlert("Se ha postulado", "success");
      })
      .catch((error) => {
        //console.log(error.response.data.data.error);
        showSimpleAlert(error.response.data.data.error, "warning");
      });
  };

  const showSimpleAlert = (message, icon) => {
    Swal.fire({
      icon,
      title: message,
      customClass: {
        container: "my-swal-container",
      },
    });
  };

  // To select one hour preference of the volunteer and show the works that match with the preference
  const [hours, setHours] = useState([""]);
  const [userPrefHour, setUserPrefHour] = useState("");
  const handleHourChange = (e) => {
    setUserPrefHour(e.target.value === "" ? "" : e.target.value);
  };

  // To select one tag of the volunteer and show the works that match with it
  const [userTags, setUserTags] = useState([""]);
  const [userPrefTag, setUserPrefTag] = useState([]);
  const handleTagChange = (e) => {
    const {
      target: { value },
    } = e;
    setUserPrefTag(
      // On autofill we get a stringified value.
      typeof value === "string" ? (value === "" ? [] : value.split(",")) : value
    );
  };

  useEffect(() => {
    volunteerService
      .showProfile()
      .then((response) => {
        setHours(response.blocks);
        setUserTags(response.tags);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // To select the dates of the postulation
  const [selectedDates, setSelectedDates] = useState([null, null]);
  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  return (
    <Box
      flex={7}
      p={2}
      px={15}
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

      <WorkModalVolunteer
        modalOpen={modalOpen}
        handleModalClose={handleModalClose}
        selectedWork={selectedWork}
        handlePostulation={handlePostulation}
        handleDateChange={handleDateChange}
      />
    </Box>
  );
}
