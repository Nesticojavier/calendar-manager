import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Box, Grid, Stack, Typography, backdropClasses } from "@mui/material";
import { getDaysInMonth, isSameDay, addDays, format } from "date-fns";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import Cookies from "js-cookie";
import { alpha } from "@mui/system";

export default function WorkInstanceTraking() {
  // define for navigate to other rute
  const location = useLocation();
  const { id: workId } = useParams();
  const workInstance = location.state.workInstance;
  const work = workInstance.work;

  // to get token for api authentication
  const token = Cookies.get("token");
  const headers = { Authorization: `Bearer ${token}` };

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

  // to store the work data
  const [workData, setWorkData] = useState([]);

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

  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:3000/provider/myjobs/`, { headers })
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
  // }, []);

  // return job blocks in a day
  const isBlocksOnDay = (work, day) => {
    // Add 1 day to the end date and the start date because the date-fns library
    const dateInit = addDays(new Date(work.dateInit), 1);
    const dateEnd = addDays(new Date(work.dateEnd), 1);

    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);
    // Get the name in Spanish of the day
    const dayName = date.toLocaleDateString("es-ES", { weekday: "long" });

    // Check if the work is within the start and end range
    const isInRange =
      (date >= dateInit && date <= dateEnd) ||
      isSameDay(date, dateInit) ||
      isSameDay(date, dateEnd);

    if (!isInRange) return [];

    const matchingBlocks = work.blocks.filter(
      (block) => block.day && block.day.toLowerCase() === dayName
    );

    // Return true if both conditions are true, and false otherwise
    return matchingBlocks;
  };

  // verify if exist register from data base
  const existRegister = (hour, day) => {
    // Convert the day number to a Date object
    const date = new Date(currentYear, currentMonth, day);

    const formattedDate = format(date, "yyyy-MM-dd");
    const foundRegister = data.find(
      (register) =>
        register.date &&
        register.hour &&
        register.date === formattedDate &&
        register.hour === hour
    );

    return foundRegister;
  };

  // to show a dialog with the work information
  const [selectedWork, setSelectedWork] = useState(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWorkClick = (work) => {
    setDialogOpen(true);
    setSelectedWork(work);
  };

  return (
    <Stack
      p={4}
      px={10}
      direction="row"
      spacing={2}
      justifyContent="space-between"
    >
      <Box
        flex={8}
        p={2}
        // px={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "auto",
          minWidth: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // width: '100%',
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
          // spacing={2}
          sx={{
            margin: "0px",
            minWidth: "100%",
            "--Grid-borderWidth": "1px",
            borderLeft: "var(--Grid-borderWidth) solid",
            borderColor: "black",
            "& > div": {
              borderRight: "var(--Grid-borderWidth) solid",
              borderBottom: "var(--Grid-borderWidth) solid",
              borderColor: "black",
            },
          }}
        >
          {/* To display the days of the week */}
          {days.map((day) => (
            <Grid
              key={day}
              item
              xs={12 / 7}
              minHeight={70}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center", 
                bgcolor: alpha(import.meta.env.VITE_COLOR_PRIMARY, 0.2),
                display: "flex",
                borderTop: "var(--Grid-borderWidth) solid",
                borderColor: "black",
              }}
            >
              <h3 style={{ margin: 0 }}>{day}</h3>
            </Grid>
          ))}

          {/* To display the first day of the month on the corresponding day of the week */}
          {[...Array(firstDay)].map((_, index) => (
            <Grid key={index} item xs={12 / 7} minHeight={100} />
          ))}

          {/* To display the days of the month */}
          {[...Array(daysInMonth)].map((_, index) => {
            return (
              <Grid
                pt={1}
                pl={1}
                key={index}
                item
                xs={12 / 7}
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
                  {isBlocksOnDay(work, index + 1).map((block) =>
                    existRegister(block.hour, index + 1) ? (
                      existRegister(block.hour, index + 1).attendance ? (
                        <PaintBlock block={block} color="lightgreen" />
                      ) : (
                        <PaintBlock block={block} color="pink" />
                      )
                    ) : (
                      <PaintBlock block={block} color="lightgray" />
                    )
                  )}
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box p={0} flex={2}>
        <Grid container alignItems="center" rowSpacing={1}>
          <Grid item md={1}>
            <Box width={16} height={16} bgcolor="lightgreen" />
          </Grid>
          <Grid item md={11}>
            <Typography variant="body1">Asistente</Typography>
          </Grid>
          <Grid item md={1}>
            <Box width={16} height={16} bgcolor="pink" />
          </Grid>
          <Grid item md={11}>
            <Typography variant="body1">Inasistente</Typography>
          </Grid>
          <Grid item md={1}>
            <Box width={16} height={16} bgcolor="lightgray" />
          </Grid>
          <Grid item md={11}>
            <Typography variant="body1">En espera</Typography>
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

// component to paint block into calendar
function PaintBlock({ block, color }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "2px 6px",
        backgroundColor: color,
        borderRadius: "4px",
        fontSize: "12px",
        margin: "2px",
        cursor: "pointer",
      }}
      onClick={() => handleWorkClick(work)}
    >
      {block.hour}
    </span>
  );
}

const data = [
  { date: "2023-07-03", hour: "7:00 AM", attendance: true },
  { date: "2023-07-05", hour: "8:00 AM", attendance: true },
  { date: "2023-07-10", hour: "7:00 AM", attendance: true },
  { date: "2023-07-12", hour: "8:00 AM", attendance: false },
  { date: "2023-07-17", hour: "7:00 AM", attendance: false },
  { date: "2023-07-19", hour: "8:00 AM", attendance: true },
];
